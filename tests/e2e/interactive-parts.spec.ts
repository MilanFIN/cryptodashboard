import { test, expect, Page } from "@playwright/test";

test("hover on icon", async ({ page }) => {
    await page.goto("/en/exchanges");

    const spanSelector = 'span:has-text("Share %")';
    const svgInsideSpanSelector = `${spanSelector} svg`;
    await page.hover(svgInsideSpanSelector);

    const spanInfoSelector = "#shareoftotalvolumeinfo";
    await expect(page.locator(spanInfoSelector)).toBeVisible();
    await expect(page.locator(spanInfoSelector)).toContainText(
        "Share of total trading volume during the last 24h"
    );
});

test("change currency", async ({ page }) => {
    await page.goto("/en/coin/bitcoin");

    //todo: change currency to something else than usd

    await page.click("#currencyselector");
    await page.click("text=EUR");

    const tableSelector = "#coindetails-table tbody";
    const rows = await page.$$(tableSelector + " tr");

    let currency = "";

    for (let row of rows) {
        const cells = await row.$$("td");

        if (cells.length > 1) {
            const firstCellText = await cells[0].textContent();
            if (firstCellText && firstCellText.includes("Price:")) {
                const secondCellText = await cells[1].textContent();
                if (secondCellText) {
                    currency = (secondCellText.trim().match(/^[^\d]*/) || [''])[0]
                    break;
                }
            }
        }
    }
    await expect(currency).toBe("€");


});
