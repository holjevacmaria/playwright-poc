import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/homepage.page";
import { Contact } from "../pages/contact.page";

test.describe("Test describe", () => {
  let homepage: Homepage;
  let contact: Contact;
  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    contact = new Contact(page);
    await homepage.goto();
  });

  test("Verify that the modal is displayed correctly", async ({ page }) => {
    await homepage.contactBtn.click();
    await expect(contact.contactModal).toHaveScreenshot("contact-modal.png");
  });

  test("Populate input with data and send the message", async ({ page }) => {
    await homepage.contactBtn.click();
    await contact.emailInput.fill("test@test.com");
    await contact.nameInput.fill("Test");
    await contact.msgInput.fill("This is a Test message.");
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Thanks for the message!!");
      await dialog.accept();
    });
    await contact.sendMsgBtn.click();
  });
  test("Verify that the modal can be closed on X btn", async ({ page }) => {
    await homepage.contactBtn.click();
    await contact.modalXBtn.click();
    await expect(contact.contactModal).not.toBeVisible();
  });
  // should fail
  test("Once the modal is closed and opened again, the form inputs are reset", async ({
    page,
  }) => {
    await homepage.contactBtn.click();
    await contact.emailInput.fill("test@test.com");
    await contact.nameInput.fill("Test");
    await contact.msgInput.fill("This is a Test message.");
    await contact.modalCloseBtn.click();
    await homepage.contactBtn.click();
    await expect.soft(contact.emailInput).toHaveValue("");
    await expect.soft(contact.nameInput).toHaveValue("");
    await expect(contact.msgInput).toHaveValue("");
  });
});
