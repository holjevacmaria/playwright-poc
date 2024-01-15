import { test } from "../tests/fixtures/basePage";
import { expect } from "@playwright/test";

test.describe("Cart", () => {
  test.beforeEach(async ({ cart }) => {
    await cart.goto();
  });

  test("Verify the state of an empty cart", async ({ cart }) => {
    await expect(cart.deleteItemBtn).not.toBeVisible();
    //await expect(page).toHaveScreenshot("empty-cart.png");
  });
  // added a fixme annotation because the web has some issues when this test is executed
  // in headless mode, headed and step by step - no problem
  test.fixme(
    "Add an item from each category to cart and verify they are added",
    async ({ homepage, cart }) => {
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

  test("Verify that the user can successfully place the order", async ({
    homepage,
    cart,
  }) => {
    await homepage.logo.click();
    await homepage.phoneProduct.click();
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

  test("Verify that the user cannot place an empty order", async ({
    cart,
    page,
  }) => {
    await cart.placeOrderBtn.click();
    await expect(cart.nameInput).toHaveValue("");
    await expect(cart.countryInput).toHaveValue("");
    await expect(cart.cityInput).toHaveValue("");
    await expect(cart.creditCardInput).toHaveValue("");
    await expect(cart.monthInput).toHaveValue("");
    await expect(cart.yearInput).toHaveValue("");
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Please fill out Name and Creditcard.");
      await dialog.accept();
    });
    await cart.purchaseBtn.click();
    await expect(cart.successPopup).not.toBeVisible();
  });
  test("Verify that the user cannot place an order without entering data", async ({
    homepage,
    cart,
    page,
  }) => {
    await homepage.logo.click();
    await homepage.phoneProduct.click();
    await homepage.AddToCartBtn.click();
    await homepage.cartBtn.click();
    await cart.placeOrderBtn.click();
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Please fill out Name and Creditcard.");
      await dialog.accept();
    });
    await cart.purchaseBtn.click();
    await expect(cart.successPopup).not.toBeVisible();
  });

  // Should fail because the user is able to place an empty order if they fill out mandatory fields on a purchase form
  test.fixme(
    "Verify that the user cannot place an empty order if they fill out mandatory fields on a purchase form",
    async ({ cart, page }) => {
      await page.pause();
      await cart.placeOrderBtn.click();
      await cart.nameInput.fill("Maria");
      await expect(cart.countryInput).toHaveValue("");
      await expect(cart.cityInput).toHaveValue("");
      await cart.creditCardInput.fill("42424242424242");
      await expect(cart.monthInput).toHaveValue("");
      await expect(cart.yearInput).toHaveValue("");
      await cart.purchaseBtn.click();
      await expect(cart.successPopup).not.toBeVisible();
    }
  );
});
