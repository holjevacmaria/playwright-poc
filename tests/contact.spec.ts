import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/homepage.page";
import { Contact } from "../pages/contact.page";

test.describe("Test describe", () => {
  test.beforeEach(({ page }) => {
    let homepage: Homepage;
    let contact: Contact;
  });

  test("Verify that the modal is displayed correctly", async ({ page }) => {
    const homepage = new Homepage(page);
    const contact = new Contact(page);
    await homepage.goto();
    await homepage.contactBtn.click();
    await expect(contact.contactModal).toHaveScreenshot("contact-modal.png");
  });
  test("Populate input with data and send the message", async ({ page }) => {
    const homepage = new Homepage(page);
    const contact = new Contact(page);
    await page.pause();
    await homepage.goto();
    await homepage.contactBtn.click();
    await contact.emailInput.fill("test@test.com");
    await contact.nameInput.fill("Test");
    await contact.msgInput.fill("This is a Test message.");
    // explore further
    //page.on("dialog", (dialog) => console.log(dialog.message()));
    //await contact.sendMsgBtn.click();
  });
  // should fail
  test("Once the modal is closed and opened again, the form inputs are reset", async ({
    page,
  }) => {
    const homepage = new Homepage(page);
    const contact = new Contact(page);
    await homepage.goto();
    await page.pause();
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
