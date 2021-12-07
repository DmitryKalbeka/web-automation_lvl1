import { ChainablePromiseElement } from 'webdriverio'

export default class BaseElement {

    constructor(public readonly element: ChainablePromiseElement<Promise<WebdriverIO.Element>>) {}

    async isDisplayed(): Promise<boolean> {
        return (await this.element).isDisplayed()
    }

    async isExisting(): Promise<boolean> {
        return (await this.element).isExisting()
    }

    async getText(): Promise<string> {
        return (await this.element).getText()
    }

    async waitAndGetText(): Promise<string> {
        await browser.waitUntil(async () => {
            return (await this.element).isExisting()
        })
        return (await this.element).getText()
    }

    async scrollIntoView(): Promise<void> {
        return (await this.element).scrollIntoView()
    }

    async getAttribute(attribute: string): Promise<string> {
        return (await this.element).getAttribute(attribute)
    }
}