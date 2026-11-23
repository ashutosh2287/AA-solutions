/**
 * Scans public/projects/<slug>/ for screenshot files and writes
 * content/screenshot-manifest.json.
 *
 * Running this before dev/build means <ProjectImage> knows whether a real
 * screenshot exists, so missing files never produce 404 requests or console
 * noise. Drop an image in the right folder, restart the dev server (or run
 * `npm run screenshots`), and it appears automatically.
 */

import { readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const projectsDir = path.join(root, "public", "projects");
const outputFile = path.join(root, "content", "screenshot-manifest.json");

const SLOTS = new Set(["cover", "desktop-1", "desktop-2", "mobile-1"]);
const EXT_PRIORITY = [".avif", ".webp", ".png", ".jpg", ".jpeg"];

export async function writeScreenshotManifest() {
  /** @type {Record<string, Record<string, string>>} */
  const manifest = {};

  let projectFolders = [];
  try {
    projectFolders = await readdir(projectsDir, { withFileTypes: true });
  } catch {
    projectFolders = [];
  }

  for (const folder of projectFolders) {
    if (!folder.isDirectory()) continue;

    let files = [];
    try {
      files = await readdir(path.join(projectsDir, folder.name));
    } catch {
      continue;
    }

    /** @type {Record<string, string>} */
    const slots = {};
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!EXT_PRIORITY.includes(ext)) continue;
      const slot = path.basename(file, ext);
      if (!SLOTS.has(slot)) continue;
      const current = slots[slot];
      if (!current || EXT_PRIORITY.indexOf(ext) < EXT_PRIORITY.indexOf(current)) {
        slots[slot] = ext;
      }
    }

    const ordered = Object.fromEntries(
      Object.keys(slots)
        .sort()
        .map((slot) => [slot, slots[slot]]),
    );
    if (Object.keys(ordered).length > 0) manifest[folder.name] = ordered;
  }

  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  return manifest;
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  writeScreenshotManifest()
    .then((manifest) => {
      const count = Object.values(manifest).reduce(
        (total, slots) => total + Object.keys(slots).length,
        0,
      );
      console.log(`Screenshot manifest updated (${count} image(s)).`);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
