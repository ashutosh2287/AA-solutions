import { expect, test } from "@playwright/test";

test.describe("Brand logo theme stability", () => {
  test.skip(({ isMobile }) => isMobile, "Header logo visual check on desktop");

  test("logo looks identical in light and dark mode", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const logo = page.getByTestId("brand-logo").first();
    await expect(logo).toBeVisible();
    const light = await logo.screenshot();

    await page.getByRole("button", { name: /toggle colour theme/i }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(logo).toBeVisible();
    const dark = await logo.screenshot();

    expect(dark.equals(light)).toBe(true);
  });

  test("logo hover state is captured in light and dark mode", async ({ page }) => {
    for (const mode of ["light", "dark"] as const) {
      await page.emulateMedia({ colorScheme: mode });
      await page.goto("/");
      if (mode === "dark") {
        await page.getByRole("button", { name: /toggle colour theme/i }).click();
        await expect(page.locator("html")).toHaveClass(/dark/);
      }
      const logo = page.getByTestId("brand-logo").first();
      await expect(logo).toBeVisible();
      await logo.hover();
      await page.waitForTimeout(350);
      const shot = await logo.screenshot();
      expect(shot.length).toBeGreaterThan(0);
    }
  });
});
