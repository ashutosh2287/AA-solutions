import { expect, test } from "@playwright/test";

const routes = ["/", "/services", "/work", "/contact"];

test.describe("visual regression", () => {
  test.skip(({ browserName, isMobile }) => browserName !== "chromium" || isMobile, "Desktop Chromium baseline");

  for (const route of routes) {
    test(`snapshot ${route}`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`${route === "/" ? "home" : route.slice(1).replace(/\//g, "-")}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    });
  }
});
