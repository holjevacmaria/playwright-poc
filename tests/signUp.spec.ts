import { test } from "../tests/fixtures/basePage";
import { expect } from "@playwright/test";

test.describe("Sign up", () => {
  test.beforeEach(async ({ signUp }) => {
    await signUp.goto();
  });

  test("Initial test", async ({ signUp }) => {});
});
