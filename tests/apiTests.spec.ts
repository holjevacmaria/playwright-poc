import { test } from "../tests/fixtures/basePage";
import { expect } from "@playwright/test";
import dotenv from "dotenv";

test.describe("API tests", () => {
  dotenv.config();
  test.beforeEach(async ({ homepage }) => {
    await homepage.goto();
  });

  test("Should make an API request using Playwright fetch", async ({
    homepage,
    logIn,
    page,
  }) => {
    const response = await page.evaluate(async () => {
      const apiResponse = await fetch("https://api.demoblaze.com/entries");
      return apiResponse.json();
    });
    expect(response.Items).toHaveLength(9);
    expect(response).toHaveProperty("LastEvaluatedKey");
  });

  test("API 2", async ({ homepage, page }) => {});
  test("API 3", async ({ homepage, page }) => {});
  test("API 4", async ({ homepage, page }) => {});
});
