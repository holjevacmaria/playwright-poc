import { test } from "../tests/fixtures/basePage";
import { expect } from "@playwright/test";
import dotenv from "dotenv";

test.describe("API tests", () => {
  dotenv.config();
  test.beforeEach(async ({ homepage }) => {
    await homepage.goto();
  });

  test("Should make an API request to entires endpoint", async ({
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

  test("Should make an API request to config.json endpoint", async ({
    homepage,
    page,
  }) => {
    const response = await page.evaluate(async () => {
      const apiResponse = await fetch("https://www.demoblaze.com/config.json");
      return apiResponse.json();
    });
    expect(response).toStrictEqual({
      API_URL: "https://api.demoblaze.com",
      HLS_URL: "https://hls.demoblaze.com",
    });
    expect(response).toHaveProperty("API_URL");
    expect(response).toHaveProperty("HLS_URL");
    // expect(response.cat).toHaveText("notebook");
  });
  test("API 3", async ({ homepage, page }) => {});
  test("API 4", async ({ homepage, page }) => {});
});
