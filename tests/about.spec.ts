import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/homepage.page";
import { About } from "../pages/about.page";

test.describe("Test describe", () => {
  test.beforeEach(({ page }) => {
    let homepage: Homepage;
    let about: About;
  });

  test("Initial test", async ({ page }) => {
    const homepage = new Homepage(page);
    const about = new About(page);
    await homepage.goto();
    await page.pause();
    await homepage.aboutBtn.click();
    await expect(about.modalDialog).toHaveScreenshot("about-modal.png");
  });
});
