import { test, expect, Page } from "@playwright/test";

test("hover on icon", async ({ page }) => {
    await page.goto("http://localhost:3000/en/exchanges");

    const spanSelector = 'span:has-text("Share %")';
    const svgInsideSpanSelector = `${spanSelector} svg`;
    await page.hover(svgInsideSpanSelector);

    const spanInfoSelector = '#shareoftotalvolumeinfo';
    await expect(page.locator(spanInfoSelector)).toBeVisible();
    await expect(page.locator(spanInfoSelector)).toContainText('Share of total trading volume during the last 24h');
});

