import { expect, test } from "@playwright/test";

test.describe("Site shell", () => {
  test("home page renders the hero and primary navigation", async ({
    page,
    isMobile,
  }) => {
    test.skip(
      Boolean(isMobile),
      "desktop navigation is covered by the mobile menu test",
    );
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: /AA Solutions/i }),
    ).toBeVisible();

    const nav = page.getByRole("navigation", { name: "Primary" });
    for (const label of ["Services", "Work", "Process", "About"]) {
      await expect(nav.getByRole("link", { name: label })).toBeVisible();
    }

    await expect(
      page.getByRole("link", { name: "Start a project" }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "See our work" }).first(),
    ).toBeVisible();
  });

  test("header navigation moves between pages", async ({ page, isMobile }) => {
    test.skip(
      Boolean(isMobile),
      "desktop navigation is covered by the mobile menu test",
    );
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Primary" });
    await nav.getByRole("link", { name: "Services" }).click();

    await expect(page).toHaveURL(/\/services$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Design and development/i }),
    ).toBeVisible();
  });

  test("every page sets a unique title and description", async ({ page }) => {
    const seen = new Set<string>();

    for (const route of ["/", "/services", "/work", "/process", "/about", "/contact"]) {
      await page.goto(route);

      const title = await page.title();
      expect(title.length, `${route} title`).toBeGreaterThan(10);
      expect(seen.has(title), `${route} has a duplicate title`).toBe(false);
      seen.add(title);

      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description, `${route} description`).toBeTruthy();
    }
  });

  test("no horizontal scroll at 360px", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });

    for (const route of ["/", "/services", "/work", "/contact"]) {
      await page.goto(route);
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(overflows, `${route} overflows horizontally`).toBe(false);
    }
  });

  test("404 page offers a way back", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");

    await expect(
      page.getByRole("heading", { level: 1, name: /wrong turn/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /back to home/i })).toBeVisible();
  });
});

test.describe("Work", () => {
  test("grid lists all projects and filters by category", async ({ page }) => {
    await page.goto("/work");

    const cards = page.locator("article");
    await expect(cards).toHaveCount(4);

    await page.getByRole("button", { name: /^Website/ }).click();
    await expect(page.locator("article")).toHaveCount(3);

    await page.getByRole("button", { name: /^Web app/ }).click();
    await expect(page.locator("article")).toHaveCount(1);

    await page.getByRole("button", { name: /^All/ }).click();
    await expect(page.locator("article")).toHaveCount(4);
  });

  test("case study shows content and a safe external link", async ({ page }) => {
    await page.goto("/work/fastq");

    await expect(page.getByRole("heading", { level: 1, name: "fastQ" })).toBeVisible();

    const liveLink = page.getByRole("link", { name: /visit live site/i });
    await expect(liveLink).toBeVisible();
    await expect(liveLink).toHaveAttribute("target", "_blank");
    await expect(liveLink).toHaveAttribute("rel", /noopener/);
    await expect(liveLink).toHaveAttribute("rel", /noreferrer/);

    await expect(page.getByText(/TODO:/).first()).toBeVisible();
  });

  test("next project link moves through the set", async ({ page }) => {
    await page.goto("/work/fastq");
    await page.getByRole("link", { name: /view project/i }).click();
    await expect(page).toHaveURL(/\/work\/kl-boox-house$/);
  });
});

test.describe("Contact form", () => {
  test("blocks submission and shows field errors", async ({ page }) => {
    await page.goto("/contact");

    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(page.getByText("Please enter your email address.")).toBeVisible();
    await expect(page.getByText("Please choose a project type.")).toBeVisible();
    await expect(page.getByText(/at least 20 characters/i)).toBeVisible();
  });

  test("rejects an invalid email address", async ({ page }) => {
    await page.goto("/contact");

    await page.getByLabel("Your name").fill("Test Person");
    await page.getByLabel("Email address").fill("not-an-email");
    await page
      .getByLabel("What are you trying to build?")
      .fill("We need a new website for our school with admissions information.");
    await page.getByLabel("Your name").click();

    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
  });

  test("submits successfully and shows confirmation", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/contact");

    await page.getByLabel("Your name").fill("Test Person");
    await page.getByLabel("Email address").fill("test@example.com");
    await page
      .getByLabel("What are you trying to build?")
      .fill("We need a new website for our school with admissions information.");

    await page.getByRole("combobox", { name: "Project type" }).click();
    await page.getByRole("option", { name: "Business website" }).click();

    await page.getByRole("combobox", { name: "Approximate budget" }).click();
    await page.getByRole("option", { name: "Not sure yet" }).click();

    await page.getByRole("button", { name: /send message/i }).click();

    await expect(
      page.getByRole("heading", { name: /your message is on its way/i }),
    ).toBeVisible();
  });

  test("shows a server error without losing the form", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 429,
        contentType: "application/json",
        body: JSON.stringify({
          ok: false,
          error: "Too many messages from this address.",
        }),
      });
    });

    await page.goto("/contact");

    await page.getByLabel("Your name").fill("Test Person");
    await page.getByLabel("Email address").fill("test@example.com");
    await page
      .getByLabel("What are you trying to build?")
      .fill("We need a new website for our school with admissions information.");
    await page.getByRole("combobox", { name: "Project type" }).click();
    await page.getByRole("option", { name: "Business website" }).click();
    await page.getByRole("combobox", { name: "Approximate budget" }).click();
    await page.getByRole("option", { name: "Not sure yet" }).click();

    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.locator("#form-error")).toContainText(/too many messages/i);
    await expect(page.getByLabel("Your name")).toHaveValue("Test Person");
  });
});

test.describe("Mobile navigation", () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test("opens, navigates and closes with Escape", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();

    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();

    await page.getByRole("button", { name: "Open menu" }).click();
    await menu.getByRole("link", { name: "Work" }).click();
    await expect(page).toHaveURL(/\/work$/);
  });
});

test.describe("Reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("hydrates cleanly and keeps revealed content visible", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(String(error)));

    for (const route of ["/", "/work", "/work/fastq"]) {
      await page.goto(route);
      await expect(page.locator("h1").first()).toBeVisible();
      await page.waitForTimeout(1200);

      const opacity = await page
        .locator("[data-reveal]")
        .first()
        .evaluate((element) => getComputedStyle(element).opacity);
      expect(opacity, `${route} reveal is visible`).toBe("1");
    }

    expect(errors.join("\n")).not.toMatch(/hydrat|did not match|hydration/i);
    expect(errors, errors.join("\n")).toHaveLength(0);
  });
});

test.describe("Theme", () => {
  test("toggle switches to dark mode and persists", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /toggle colour theme/i }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});
