import { Locator, Page } from "@playwright/test";

export class Homepage {
  readonly page: Page;
  readonly logo: Locator;
  // nav bar and nav items
  readonly navbar: Locator;
  readonly homeBtn: Locator;
  readonly contactBtn: Locator;
  readonly aboutBtn: Locator;
  readonly cartBtn: Locator;
  readonly logInBtn: Locator;
  readonly signUpBtn: Locator;

  readonly slider: Locator;
  // categories
  readonly categories: Locator;
  readonly phonesCategory: Locator;
  readonly laptopsCategory: Locator;
  readonly monitorsCategory: Locator;
  readonly productItems: Locator;
  readonly phoneProduct: Locator;
  readonly laptopProduct: Locator;
  readonly monitorProduct: Locator;
  readonly AddToCartBtn: Locator;

  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole("link", { name: "PRODUCT STORE" });
    // nav bar and nav items
    this.navbar = page.locator("div#navbarExample");
    this.homeBtn = page.getByRole("link", { name: "Home (current)" });
    this.contactBtn = page.getByRole("link", { name: "Contact" });
    this.aboutBtn = page.getByRole("link", { name: "About us" });
    this.cartBtn = page.getByRole("link", { name: "Cart", exact: true });
    this.logInBtn = page.getByRole("link", { name: "Log in" });
    this.signUpBtn = page.getByRole("link", { name: "Sign up" });

    this.slider = page.locator("div#carouselExampleIndicators");
    // categories
    this.categories = page.getByRole("link", { name: "CATEGORIES" });
    this.phonesCategory = page.getByRole("link", { name: "Phones" });
    this.laptopsCategory = page.getByRole("link", { name: "Laptops" });
    this.monitorsCategory = page.getByRole("link", { name: "Monitors" });
    this.productItems = page.locator("div.row").first();
    this.phoneProduct = page.getByRole("link", { name: "Samsung galaxy s6" });
    this.laptopProduct = page.getByRole("link", { name: "Sony vaio i5" });
    this.monitorProduct = page.getByRole("link", { name: "Apple monitor" });
    this.AddToCartBtn = page.getByRole("link", { name: "Add to cart" });
    this.footer = page.locator("#footc");
  }

  async goto() {
    await this.page.goto("https://www.demoblaze.com/", {
      waitUntil: "load",
    });
  }
}
