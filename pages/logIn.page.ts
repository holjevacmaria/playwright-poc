import { Locator, Page } from "@playwright/test";

export class LogIn {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly closeBtn: Locator;
  readonly closeXBtn: Locator;
  readonly logInBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator("#loginusername");
    this.passwordInput = page.locator("#loginpassword");
    this.closeBtn = page.getByLabel("Log in").getByText("Close");
    this.closeXBtn = page.getByLabel("Log in").getByLabel("Close");
    this.logInBtn = page.getByRole("button", { name: "Log in" });
  }

  async goto() {
    await this.page.goto("https://www.demoblaze.com/index.html");
  }
}
