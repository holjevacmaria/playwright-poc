import { Locator, Page } from "@playwright/test";

export class About {
  readonly page: Page;
  readonly modalDialog: Locator;
  readonly modalCloseBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalDialog = page.locator("div#videoModal");
    this.modalCloseBtn = page
      .locator("#videoModal")
      .getByText("Close", { exact: true });
  }
}
