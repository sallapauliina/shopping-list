const { test, expect } = require("@playwright/test");

test.describe.serial("Testing the functions", () => {
  const numb = Math.random();

  test("Testing to add an item", async ({ page }) => {
    await page.goto("/lists");

    await expect(page).toHaveTitle(`list${numb}`);

    await page.getByTestId("Add an item to the list!").click();
    await page.getByText(`list${numb}`).click();

    await expect(page.getByTestId(`item${numb}`)).toBeVisible();

    await page.locator("input[type=text]").type(`item${numb}`);

    await expect(page.getByTestId("lists")).toHaveText("Shopping lists");
  });

  test("Testing to add a list", async ({ page }) => {
    await page.goto("/lists");
    await expect(page).toHaveTitle("Shopping-lists");
    await expect(page.locator("h2")).toHaveText("Add shopping lists");

    const nameOfTheList = `list${numb}`;

    await page.getByText(`${nameOfTheList}`);
    await page.locator("input[type=text]").type(nameOfTheList);
    await page.getByTestId("Create a new list!").click();
    await expect(page.locator("a")).toHaveText("Main page");
  });

  test("Testing deleting a list", async ({ page }) => {
    await page.goto("/lists");

    await page.getByTestId(`list${numb}`).click();

    await expect(page.getByText(`list${numb}`)).not.toBeVisible();
  });

  test("Testing crossing over", async ({ page }) => {
    await page.goto("/lists");

    await page.getByTestId(`item ${numb}`).click();
    await page.getByText(`list${numb}`).click();

    await expect(page.getByText(`item ${numb}`)).toBeVisible();
  });
});

test("Testing mainpage", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h2")).toHaveText("Shared shopping lists");
  await expect(page).toHaveTitle("Main page");
  await expect(page.locator("a")).toHaveText("Lists");
});
