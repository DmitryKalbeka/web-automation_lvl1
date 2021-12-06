export abstract class BasePage {

    public async waitUntilPageIsLoaded(): Promise<void> {
        await browser.waitUntil(async function () {
            return (await browser.executeScript('return jQuery.active;', []) === 0)
        })
    }
}