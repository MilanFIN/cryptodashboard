import { test, expect, Page } from "@playwright/test";

test("load index", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("All Cryptocurrencies");
});

test("navigate to about page", async ({ page }) => {
    await page.goto("/");
    await page.click("text=About");
    await expect(page).toHaveURL("/en/about");
    await expect(page.locator("h1")).toContainText("About");
});

test("change language", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("All Cryptocurrencies");
    await page.click("text=FI");
    await expect(page).toHaveURL("/fi");
    await expect(page.locator("h1")).toContainText("Kaikki Kryptovaluutat");
});


test("save a bookmark", async ({ page }) => {
    await page.goto("/");
    await page.click("id=bookmarked_bitcoin");
    await page.click("text=Bookmarked");
    await expect(page).toHaveURL("/en/bookmarked/bitcoin");
    await expect(page.getByText("Bitcoin")).toBeVisible();
});
