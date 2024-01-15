import { Locator, Page } from "@playwright/test";

export class Contact {
  readonly page: Page;
  readonly contactModal: Locator;
  readonly emailInput: Locator;
  readonly nameInput: Locator;
  readonly msgInput: Locator;
  readonly modalCloseBtn: Locator;
  readonly modalXBtn: Locator;
  readonly sendMsgBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactModal = page.locator("div.modal-content").first();
    this.emailInput = page.locator("#recipient-email");
    this.nameInput = page.locator("#recipient-name");
    this.msgInput = page.locator("#message-text");
    this.modalCloseBtn = page.getByLabel("New message").getByText("Close");
    this.modalXBtn = page.getByLabel("New message").getByLabel("Close");
    this.sendMsgBtn = page.getByRole("button", { name: "Send message" });
  }
}
