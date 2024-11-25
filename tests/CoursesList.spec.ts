import { test, expect } from "@playwright/test";

test("create delete course list", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("название").click();
  await page.getByPlaceholder("название").fill("Test name");
  await page.getByPlaceholder("описание").click();
  await page.getByPlaceholder("описание").fill("Test Description");
  await page.getByRole("button", { name: "Добавить" }).click();
  await expect(page.getByText("Test nameTest Description")).toBeVisible();
  await page.getByRole("button", { name: "Удалить" }).click();
  await expect(page.getByText("Test nameTest Description")).not.toBeVisible();
});
