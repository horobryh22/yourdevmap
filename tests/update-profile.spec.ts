import { test, expect } from "@playwright/test";
import { adminFile, userFile } from "./constants";
import { ADMIN, USER } from "./stabs/users";

test.describe("update-profile as admin", () => {
  test.use({ storageState: adminFile });
  test("update username", async ({ page }) => {
    const profileButton = page.getByTestId("profile_header_avatar");
    const profileLink = page.getByTestId("go_to_profile_link");
    const profileLoader = page.getByTestId("user_profile_loader");

    const formUserName = page.getByTestId("profile_form_name");
    const saveFormButton = page.getByTestId("form_submit_button");

    const profileUpdateSpinner = page.getByTestId("profile_update_spinner");

    await page.goto("/");
    await profileButton.click();
    await profileLink.click();
    await page.waitForURL(`/profile/${ADMIN.id}`);

    await expect(profileLoader).not.toBeVisible();

    await formUserName.click();
    await formUserName.fill("Admin Super");
    await saveFormButton.click();

    await expect(profileUpdateSpinner).not.toBeVisible();

    await profileButton.click();
    await expect(page.getByTestId("profile_display_name")).toHaveText(
      "Admin Super",
    );

    await page.locator("html").click();

    await formUserName.click();
    await formUserName.fill("");
    await saveFormButton.click();

    await expect(profileUpdateSpinner).not.toBeVisible();

    await profileButton.click();
    await expect(page.getByTestId("profile_display_name")).toHaveText(
      "admin@gmail.com",
    );
  });

  test("can update anouther user", async ({ page }) => {
    const formUserName = page.getByTestId("profile_form_name");
    const saveFormButton = page.getByTestId("form_submit_button");

    const profileUpdateSpinner = page.getByTestId("profile_update_spinner");

    await page.goto("/profile/user-2");

    await formUserName.click();
    await formUserName.fill("User");
    await saveFormButton.click();

    await expect(profileUpdateSpinner).not.toBeVisible();

    await page.reload();

    await expect(formUserName).toHaveValue("User");
  });
});

test.describe("update-profile as user", () => {
  test.use({ storageState: userFile });
  test("update username", async ({ page }) => {
    await page.goto("/");

    const profileButton = page.getByTestId("profile_header_avatar");
    const profileLink = page.getByTestId("go_to_profile_link");
    const profileLoader = page.getByTestId("user_profile_loader");

    const formUserName = page.getByTestId("profile_form_name");
    const saveFormButton = page.getByTestId("form_submit_button");

    const profileUpdateSpinner = page.getByTestId("profile_update_spinner");

    await page.goto("/");

    await profileButton.click();
    await profileLink.click();
    await page.waitForURL(`/profile/${USER.id}`);

    await expect(profileLoader).not.toBeVisible();

    await formUserName.click();
    await formUserName.fill("User Super");
    await saveFormButton.click();

    await expect(profileUpdateSpinner).not.toBeVisible();

    await profileButton.click();
    await expect(page.getByTestId("profile_display_name")).toHaveText(
      "User Super",
    );

    await page.locator("html").click();

    await formUserName.click();
    await formUserName.fill("");
    await saveFormButton.click();

    await expect(profileUpdateSpinner).not.toBeVisible();

    await profileButton.click();
    await expect(page.getByTestId("profile_display_name")).toHaveText(
      "user@gmail.com",
    );
  });

  test("can not update anouther user", async ({ page }) => {
    await page.goto("/profile/admin");
    await expect(page.getByTestId("profile_access_denied")).toBeVisible();
  });
});
