import { test, expect } from "@playwright/test";
import { LogIn } from "../pages/logIn.page";

test.describe("Log in", () => {
  test.beforeEach(({ page }) => {
    let logIn: LogIn;
  });

  test("Initial test", async ({ page }) => {
    const logIn = new LogIn(page);
    await logIn.goto();
  });
});
