import { test, expect } from "@playwright/test";
import { Homepage } from "../pages/homepage.page";
import { Cart } from "../pages/cart.page";

test.describe("Cart", () => {
  let homepage: Homepage;
  let cart: Cart;
  test.beforeEach(async ({ page }) => {
    cart = new Cart(page);
    homepage = new Homepage(page);
    await cart.goto();
  });

  test("Verify the state of an empty cart", async ({ page }) => {
    await expect(page).toHaveScreenshot("empty-cart.png");
  });
  test.only("Add an item from each category to cart", async ({ page }) => {
    await page.pause();
    await homepage.logo.click();
    await homepage.phonesCategory.click();
    await homepage.phoneProduct.click();
    await homepage.AddToCartBtn.click();

    await homepage.logo.click();
    await homepage.laptopsCategory.click();
    await homepage.laptopProduct.click();
    await homepage.AddToCartBtn.click();

    await homepage.logo.click();
    await homepage.monitorsCategory.click();
    await homepage.monitorProduct.click();
    await homepage.AddToCartBtn.click();
    await homepage.cartBtn.click();
    await expect(cart.monitorCartItem).toBeVisible();
    await expect(page).toHaveScreenshot("three-products-in-cart.png");
  });
});
