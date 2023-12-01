import { test, expect } from "@playwright/test";
import { TestClass } from "./pages/test.page";

test.describe("Test describe", () => {
  test.beforeEach(({ page }) => {
    let testClass: TestClass;
  });

  test("Initial test", async ({ page }) => {
    const testClass = new TestClass(page);
    await testClass.goto();
  });
});
