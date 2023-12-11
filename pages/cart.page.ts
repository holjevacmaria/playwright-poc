import { Locator, Page } from "@playwright/test";

export class Cart {
  readonly page: Page;
  readonly monitorCartItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.monitorCartItem = page.getByRole("cell", { name: "Apple monitor" });
  }

  async goto() {
    await this.page.goto("https://www.demoblaze.com/cart.html#");
  }
}
