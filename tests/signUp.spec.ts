import { test, expect } from "@playwright/test";
import { SignUp } from "../pages/signUp.page";

test.describe("Sign up", () => {
  test.beforeEach(({ page }) => {
    let signUp: SignUp;
  });

  test("Initial test", async ({ page }) => {
    const signUp = new SignUp(page);
    await signUp.goto();
  });
});
