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
    //await expect(page).toHaveScreenshot("empty-cart.png");
  });
  // should fail
  test.fixme(
    "Add an item from each category to cart and verify they are added",
    async ({ page }) => {
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
      await expect.soft(cart.phoneCartItem).toBeVisible();
      await expect.soft(cart.laptopCartItem).toBeVisible();
      await expect(cart.monitorCartItem).toBeVisible();
    }
  );
  // WIP
  test("Verify that the user can successfully place the order", async ({
    page,
  }) => {
    await page.pause();
    await homepage.logo.click();
    await homepage.monitorsCategory.click();
    await homepage.monitorProduct.click();
    await homepage.AddToCartBtn.click();
    await homepage.cartBtn.click();
    await cart.placeOrderBtn.click();
    await cart.nameInput.fill("Maria");
    await cart.countryInput.fill("Croatia");
    await cart.cityInput.fill("Osijek");
    await cart.creditCardInput.fill("42424242424242");
    await cart.monthInput.fill("January");
    await cart.yearInput.fill("2025");
    await cart.purchaseBtn.click();
    await expect(cart.successPopup).toBeVisible();
    //await expect(page).toHaveScreenshot("success-popup.png");
  });
  // should fail
  test("Verify that the user cannot place an empty order", async () => {});
  test("Verify that the user cannot place an order without entering data", async () => {});
});
