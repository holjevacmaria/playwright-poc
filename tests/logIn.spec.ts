import { test } from "../tests/fixtures/basePage";
import { expect } from "@playwright/test";

test.describe("Log in", () => {
  test.beforeEach(async ({ logIn }) => {
    await logIn.goto();
  });

  test("Initial test", async ({ logIn }) => {});
});
