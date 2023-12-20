import { test } from "../tests/fixtures/basePage";
import { expect } from "@playwright/test";
import dotenv from "dotenv";

test.describe("API tests", () => {
  dotenv.config();
  test.beforeEach(async ({ homepage }) => {
    await homepage.goto();
  });

  test("GET request to entires endpoint", async ({ homepage, logIn, page }) => {
    const response = await page.evaluate(async () => {
      const apiResponse = await fetch("https://api.demoblaze.com/entries");
      return apiResponse.json();
    });
    expect(response.Items).toHaveLength(9);
    expect(response).toHaveProperty("LastEvaluatedKey");
  });

  test("GET request to entires endpoint - another way", async ({
    homepage,
    logIn,
    request,
  }) => {
    const response = await request.get("https://api.demoblaze.com/entries");
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.Items[4].title).toContain("Iphone 6 32gb");
  });

  test("GET request to config.json endpoint", async ({ homepage, page }) => {
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
  });

  test("POST request - loading of a single category", async ({
    homepage,
    request,
  }) => {
    await homepage.laptopsCategory.click();
    const response = await request.post("https://api.demoblaze.com/bycat", {
      data: { cat: "notebook" },
    });
    expect(response.status()).toBe(200);
  });

  test("POST request - loading of an item view page", async ({
    homepage,
    request,
  }) => {
    await homepage.laptopsCategory.click();
    await homepage.laptopProduct.click();
    const response = await request.post("https://api.demoblaze.com/view", {
      data: { id: "10" },
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toStrictEqual({
      cat: "monitor",
      desc:
        "LED Cinema Display features a 27-inch glossy LED-backlit TFT \n" +
        "active-matrix LCD display with IPS technology and an optimum resolution \n" +
        "of 2560x1440. It has a 178 degree horizontal and vertical viewing angle,\n" +
        ' a "typical" brightness of 375 cd/m2, contrast ratio of 1000:1, and a \n' +
        "12 ms response time.",
      id: 10,
      img: "imgs/apple_cinema.jpg",
      price: 400,
      title: "Apple monitor 24",
    });
  });
});
