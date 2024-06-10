import { test, expect, Page } from "@playwright/test";


test("load index", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("All Cryptocurrencies");
});

test("navigate to about page", async ({ page }) => {
    await page.goto("/en");
    await page.click("text=About");
    await expect(page).toHaveURL("/en/about");
    await expect(page.locator("h1")).toContainText("About");
});

test("change language", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("h1")).toContainText("All Cryptocurrencies");
    await page.click("text=FI");
    await expect(page).toHaveURL("/fi");
    await expect(page.locator("h1")).toContainText("Kaikki Kryptovaluutat");
});

test("save a bookmark", async ({ page }) => {
    await page.goto("/en");
    await page.click("id=add_bookmark_bitcoin");
    await page.waitForSelector('#remove_bookmark_bitcoin');
    await page.goto("/en/bookmarked")
    await expect(page.getByText("Bitcoin")).toBeVisible();
});

test("navigate to next page", async ({ page }) => {
    await page.goto("/en");
    await page.click("text=Next");
    await expect(page).toHaveURL("/en/2");
});

