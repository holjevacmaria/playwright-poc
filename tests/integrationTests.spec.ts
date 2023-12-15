import { test } from "../tests/fixtures/basePage";
import { expect } from "@playwright/test";

test.describe("Integration tests", () => {
  test.beforeEach(async ({ homepage }) => {
    await homepage.goto();
  });

  test("Verify the /check endpoint has correct data after logging in", async ({
    homepage,
    logIn,
    page,
  }) => {
    await homepage.logInBtn.click();
    await logIn.userNameInput.fill("maria9");
    await logIn.passwordInput.fill("pussycat123");
    await logIn.logInBtn.click();
    const checkRequest = await page.waitForRequest((request) =>
      request.url().includes("/check")
    );
    expect(checkRequest.postDataJSON().token).toContain("bWFyaWE5MTcwMzI");
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
});
