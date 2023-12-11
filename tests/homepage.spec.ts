import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/homepage.page";

test.describe("Homepage tests", () => {
  let homepage: Homepage;
  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    await homepage.goto();
  });

  test("Verify visibility of general components on the homepage", async ({
    page,
  }) => {
    await expect(page).toHaveScreenshot("initial-state.png", {
      mask: [homepage.slider],
      maskColor: "#cd090b",
    });
    await expect(homepage.logo).toBeEnabled();
    await expect(homepage.navbar).toHaveScreenshot("navbar.png");
    await expect(homepage.slider).toBeVisible();
    await expect(homepage.footer).toHaveScreenshot("footer.png");
  });

  test("Verify that clicking on the logo leads to the homepage", async ({
    page,
  }) => {
    await homepage.logo.click();
    await expect(page).toHaveURL("https://www.demoblaze.com/index.html");
  });

  test("Verify that clicking a certain category filters the items", async ({
    page,
  }) => {
    await homepage.categories.click();
    await expect(homepage.productItems).toHaveScreenshot("all-items.png");
    await homepage.phonesCategory.click();
    await expect(homepage.productItems).toHaveScreenshot("phone-items.png");
    await homepage.laptopsCategory.click();
    await expect(homepage.productItems).toHaveScreenshot("laptop-items.png");
    await homepage.monitorsCategory.click();
    await expect(homepage.productItems).toHaveScreenshot("monitor-items.png");
  });

  test("Verify single product item page", async ({ page }) => {
    await homepage.phonesCategory.click();
    await homepage.singleProduct.click();
    await expect(homepage.AddToCartBtn).toBeVisible();
    await expect(page).toHaveScreenshot("single-product-page.png");
  });

  test("Verify the font and color of the text", async ({ page }) => {
    await expect(homepage.phonesCategory).toHaveCSS("font-family", "LatoWeb");
    // PW accepts color values only in rgb!
    await expect(homepage.phonesCategory).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)"
    );
    await expect(homepage.phonesCategory).toHaveCSS(
      "color",
      "rgb(102, 102, 102)"
    );
  });
});
