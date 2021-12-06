export abstract class BasePage {

    public async waitUntilPageIsLoaded(): Promise<void> {
        await browser.waitUntil(async function () {
            console.log(await browser.executeScript('return jQuery.active;', []))
            return (await browser.executeScript('return jQuery.active;', []) <= 1)
        })
    }
}