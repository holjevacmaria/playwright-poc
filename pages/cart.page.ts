import { Locator, Page } from "@playwright/test";

export class Cart {
  readonly page: Page;
  readonly phoneCartItem: Locator;
  readonly laptopCartItem: Locator;
  readonly monitorCartItem: Locator;
  readonly placeOrderBtn: Locator;
  readonly nameInput: Locator;
  readonly countryInput: Locator;
  readonly cityInput: Locator;
  readonly creditCardInput: Locator;
  readonly monthInput: Locator;
  readonly yearInput: Locator;
  readonly closeBtn: Locator;
  readonly closeXBtn: Locator;
  readonly purchaseBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.phoneCartItem = page.getByRole("cell", { name: "Samsung galaxy s6" });
    this.laptopCartItem = page.getByRole("cell", {
      name: "Sony vaio i5",
    });
    this.monitorCartItem = page.getByRole("cell", { name: "Apple monitor" });
    this.placeOrderBtn = page.getByRole("button", { name: "Place Order" });
    this.nameInput = page.locator("#name");
    this.countryInput = page.locator("#country");
    this.cityInput = page.locator("#city");
    this.creditCardInput = page.locator("#card");
    this.monthInput = page.locator("#month");
    this.yearInput = page.locator("#year");
    this.closeBtn = page.getByLabel("Place order").getByText("Close");
    this.closeXBtn = page.getByLabel("Place order").getByLabel("Close");
    this.purchaseBtn = page.getByRole("button", { name: "Purchase" });
  }

  async goto() {
    await this.page.goto("https://www.demoblaze.com/cart.html#");
  }
}
