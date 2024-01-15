import { test } from "../tests/fixtures/basePage";
import { expect } from "@playwright/test";

test.describe("About modal", () => {
  test.beforeEach(async ({ homepage }) => {
    await homepage.goto();
  });

  test("Verify visibility of the modal", async ({ homepage, about }) => {
    await homepage.aboutBtn.click();
    await expect(about.modalDialog).toBeVisible();
    //await expect(about.modalDialog).toHaveScreenshot("about-modal.png");
  });
  test("Verify that the modal can be closed on Close and X button", async ({
    homepage,
    about,
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
