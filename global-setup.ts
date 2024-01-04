import { test as setup, expect } from "@playwright/test";
import { LogIn } from "./pages/logIn.page";
import dotenv from "dotenv";

setup("Log in", async ({ page }) => {
  dotenv.config();
  const loginPage = new LogIn(page);
  await loginPage.goto();
  await loginPage.logIn(`${process.env.USERNAME}`, `${process.env.PASSWORD}`);
  await expect(loginPage.activeUser).toBeVisible({ timeout: 20000 });

  await page.context().storageState({ path: "./LoginAuthCQ.json" });
});
