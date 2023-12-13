import { test as base } from "@playwright/test";
import { About } from "../../pages/about.page";
import { Cart } from "../../pages/cart.page";
import { Contact } from "../../pages/contact.page";
import { Homepage } from "../../pages/homepage.page";
import { LogIn } from "../../pages/logIn.page";
import { SignUp } from "../../pages/signUp.page";

export const test = base.extend<{
  about: About;
  cart: Cart;
  contact: Contact;
  homepage: Homepage;
  logIn: LogIn;
  signUp: SignUp;
}>({
  about: async ({ page }, use) => {
    await use(new About(page));
  },
  cart: async ({ page }, use) => {
    await use(new Cart(page));
  },
  contact: async ({ page }, use) => {
    await use(new Contact(page));
  },
  homepage: async ({ page }, use) => {
    await use(new Homepage(page));
  },
  logIn: async ({ page }, use) => {
    await use(new LogIn(page));
  },
  signUp: async ({ page }, use) => {
    await use(new SignUp(page));
  },
});
