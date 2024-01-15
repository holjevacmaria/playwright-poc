import { Locator, Page } from "@playwright/test";

export class About {
  readonly page: Page;
  readonly modalDialog: Locator;
  readonly modalCloseBtn: Locator;
  readonly modalXBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalDialog = page.locator("div.modal-content").nth(3);
    this.modalCloseBtn = page
      .locator("#videoModal")
      .getByText("Close", { exact: true });
    this.modalXBtn = page.locator("#videoModal").getByLabel("Close");
  }
}
