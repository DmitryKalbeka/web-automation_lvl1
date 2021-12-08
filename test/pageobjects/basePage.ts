export abstract class BasePage {

    public async waitUntilPageIsLoaded(): Promise<void> {
        await browser.waitUntil(async function () {
            return (await browser.executeScript('return jQuery.active;', []) === 0)
        })
    }

    protected async getItemsList<T>(elements: WebdriverIO.Element[], type: { new (element: WebdriverIO.Element): T; }): Promise<T[]> {
        const elementsList: T[] = []
        for (const element of elements) {
            elementsList.push(new type(element))
        }
        return elementsList
    }
}