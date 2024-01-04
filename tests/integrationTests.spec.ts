import { test } from "../tests/fixtures/basePage";
import { expect } from "@playwright/test";
import dotenv from "dotenv";
import fs from "fs/promises";

test.describe("Integration tests", () => {
  dotenv.config();
  test.beforeEach(async ({ homepage }) => {
    await homepage.goto();
  });

  test("Verify the /check endpoint has correct data after logging in", async ({
    homepage,
    logIn,
    page,
  }) => {
    await homepage.logInBtn.click();
    await logIn.userNameInput.fill(`${process.env.USERNAME}`);
    await logIn.passwordInput.fill(`${process.env.PASSWORD}`);
    await logIn.logInBtn.click();

    // ovo ostavljam sebi za dusu, hvala!
    // const cookies = await page.context().cookies();
    // const jsonCookies = JSON.stringify(cookies, null, 2);
    // fs.writeFile("../LoginAuthCQ.json", jsonCookies);

    const checkRequest = await page.waitForRequest((request) =>
      request.url().includes("/check")
    );
    expect(checkRequest.postDataJSON().token).toContain("bWFyaWE5MTcw");
    await expect(page.locator("#nameofuser")).toBeVisible();
  });

  test("Verify that the content filters once the user chooses a category", async ({
    homepage,
    page,
  }) => {
    // prolazi bez await, sa await pada
    homepage.monitorsCategory.click();
    const checkRequest = await page.waitForRequest((request) =>
      request.url().includes("/bycat")
    );
    expect(checkRequest.postDataJSON()).toEqual({
      cat: "monitor",
    });
  });

  test("Verify that the URL changes once the User clicks on Cart", async ({
    homepage,
    page,
  }) => {
    expect(page.url()).toBe("https://www.demoblaze.com/");
    await homepage.cartBtn.click();
    expect(page.url()).toBe("https://www.demoblaze.com/cart.html");
  });

  test("Verify URL change on product click + /view request", async ({
    homepage,
    page,
  }) => {
    expect(page.url()).toBe("https://www.demoblaze.com/");

    await homepage.phoneProduct.click();
    const checkRequest = await page.waitForRequest((request) =>
      request.url().includes("/view")
    );
    expect(checkRequest.postDataJSON()).toEqual({
      id: "1",
    });
    expect(page.url()).toBe("https://www.demoblaze.com/prod.html?idp_=1");
  });
});
