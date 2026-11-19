/**
 * Captures project screenshots for the Work pages.
 *
 *   npm run screenshots              # all projects with a liveUrl
 *   npm run screenshots -- fastq     # one project
 *
 * Output (per project):
 *   public/projects/<slug>/cover.png      1440x900  (16:10, top of page)
 *   public/projects/<slug>/desktop-1.png  1440x900  (scrolled)
 *   public/projects/<slug>/desktop-2.png  1440x900  (scrolled further)
 *   public/projects/<slug>/mobile-1.png   390x844
 *
 * Notes
 * - Sites are captured as a signed-out visitor. If a site shows a cookie
 *   banner, a login wall or an interstitial, that is what ends up in the
 *   screenshot — check the output and retake manually if needed.
 * - Some sites need time for fonts, images or client-side rendering. Increase
 *   SETTLE_MS below if a capture looks half-loaded.
 * - Never capture private data. Use a public page only.
 */

import { mkdir } from "node:fs/promises";
import path from "node:path";

import { chromium, type Browser, type Page } from "@playwright/test";

import { projects } from "../content/projects";
import { writeScreenshotManifest } from "./build-screenshot-manifest.mjs";

const SETTLE_MS = 2500;
const NAV_TIMEOUT_MS = 45_000;
const OUT_ROOT = path.join(process.cwd(), "public", "projects");

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

const requested = process.argv.slice(2).filter((argument) => !argument.startsWith("-"));

async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded").catch(() => undefined);
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {
    // Network never goes idle on some sites (analytics, chat widgets). Keep going.
  });
  await page.waitForTimeout(SETTLE_MS);
}

async function capture(
  browser: Browser,
  slug: string,
  url: string,
  viewport: { width: number; height: number },
  fileName: string,
  scrollTo = 0,
) {
  const directory = path.join(OUT_ROOT, slug);
  await mkdir(directory, { recursive: true });

  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    isMobile: viewport.width < 600,
    hasTouch: viewport.width < 600,
    reducedMotion: "reduce",
    userAgent:
      viewport.width < 600
        ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        : undefined,
  });

  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: NAV_TIMEOUT_MS });
    await settle(page);

    if (scrollTo > 0) {
      await page.evaluate((offset) => window.scrollTo(0, offset), scrollTo);
      await page.waitForTimeout(900);
    }

    const target = path.join(directory, fileName);
    await page.screenshot({ path: target, fullPage: false });
    console.log(`  ✓ ${path.relative(process.cwd(), target)}`);
  } finally {
    await context.close();
  }
}

async function main() {
  const targets = projects.filter((project) => {
    if (!project.liveUrl) return false;
    if (requested.length === 0) return true;
    return requested.includes(project.slug);
  });

  if (targets.length === 0) {
    console.log("No matching projects with a live URL.");
    return;
  }

  console.log(`Capturing ${targets.length} project(s)…\n`);

  const browser = await chromium.launch();
  let failures = 0;

  try {
    for (const project of targets) {
      const url = project.liveUrl;
      if (!url) continue;

      console.log(`${project.name} — ${url}`);

      try {
        await capture(browser, project.slug, url, DESKTOP, "cover.png");
        await capture(browser, project.slug, url, DESKTOP, "desktop-1.png", 420);
        await capture(browser, project.slug, url, DESKTOP, "desktop-2.png", 1400);
        await capture(browser, project.slug, url, MOBILE, "mobile-1.png");
      } catch (error) {
        failures += 1;
        console.error(
          `  ✗ failed: ${error instanceof Error ? error.message : String(error)}`,
        );
      }

      console.log("");
    }
  } finally {
    await browser.close();
  }

  console.log(
    failures === 0
      ? "Done. Review the images in public/projects/ before committing."
      : `Done with ${failures} failure(s). Check the output above.`,
  );

  await writeScreenshotManifest();

  if (failures > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
