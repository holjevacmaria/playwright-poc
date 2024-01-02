import { test } from "../tests/fixtures/basePage";
import { expect } from "@playwright/test";

test.describe("Mocked data tests", () => {
  test.beforeEach(async ({ homepage }) => {
    await homepage.goto();
  });

  test("Intercept the View request and validate that new data is visible", async ({
    homepage,
    page,
  }) => {
    await homepage.laptopsCategory.click();
    await homepage.laptopProduct.click();
    // Intercept network requests
    await page.route("https://api.demoblaze.com/view", (route) => {
      // Mock the API response
      const mockData = {
        cat: "Category",
        desc: "Lorem ipsum - Description of this product has been corrupted!",
        id: 10,
        img: "imgs/apple_cinema.jpg",
        price: 50000000000,
        title: "Intercepted request",
      };
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockData),
      });
    });

    const content = await page.textContent("#tbodyid h2");
    expect(content).toContain("Intercepted request");
  });

  test("Intercept the /entries request and change status to 500", async ({
    homepage,
    page,
  }) => {
    page.route("https://api.demoblaze.com/entries", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      });
    });
    // since the entries ep was not successfull, there is no product data on the screen
    await expect(homepage.phoneProduct).not.toBeVisible();
  });

  test("Intercept a certain category and change data for all items", async ({
    homepage,
    page,
  }) => {
    page.route("https://api.demoblaze.com/bycat", (route) => {
      route.fulfill({
        path: "tests/mock/laptopCategoryProducts.json",
      });
    });
    await homepage.laptopsCategory.click();
    await expect(
      page.getByRole("link", { name: "Unique Title" })
    ).toBeVisible();
  });

  test("Intercept the viewcart endpoint and change the given data", async ({
    homepage,
    page,
  }) => {
    await homepage.cartBtn.click();
    await page.route("https://api.demoblaze.com/viewcart", (route) => {
      const mockData = {
        Items: [
          {
            cookie: "maria9",
            id: "f3e1b78e-e617-173d-facb-b6c68be6d0df",
            prod_id: 13,
          },
          {
            cookie: "maria9",
            id: "fb07b1f5-f3a8-3f07-3af6-0511878d6499",
            prod_id: 10,
          },
        ],
      };

      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockData),
      });
    });

    await expect(
      page.getByRole("cell", { name: "Apple monitor" })
    ).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Dell 15.6 Inch" })
    ).toBeVisible();
  });
});
