import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/homepage.page";
import { About } from "../pages/about.page";

test.describe("About modal", () => {
  let homepage: Homepage;
  let about: About;

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    about = new About(page);
    await homepage.goto();
  });

  test("Verify elements on About modal", async ({ page }) => {
    await homepage.aboutBtn.click();
    //await expect(about.modalDialog).toHaveScreenshot("about-modal.png");
  });
  test("Verify that the modal can be closed on Close and X button", async ({
    page,
  }) => {
    await homepage.aboutBtn.click();
    await expect(about.modalDialog).toBeVisible();
    await about.modalCloseBtn.click();
    await expect(about.modalDialog).not.toBeVisible();

    await homepage.aboutBtn.click();
    await expect(about.modalDialog).toBeVisible();
    await about.modalXBtn.click();
    await expect(about.modalDialog).not.toBeVisible();
  });
});
