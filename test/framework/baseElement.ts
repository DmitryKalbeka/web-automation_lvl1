import { ChainablePromiseElement } from 'webdriverio'

export default class BaseElement {

    constructor(public readonly element: ChainablePromiseElement<Promise<WebdriverIO.Element>>) {}

    async click(): Promise<void> {
        return this.element.click()
    }

    async hover(): Promise<void> {
        return this.element.moveTo()
    }

    async isDisplayed(): Promise<boolean> {
        return this.element.isDisplayed()
    }

    async isExisting(): Promise<boolean> {
        return this.element.isExisting()
    }

    async getText(): Promise<string> {
        return this.element.getText()
    }

    async waitAndGetText(): Promise<string> {
        await browser.waitUntil(async () => {
            return this.element.isExisting()
        })
        return this.element.getText()
    }

    async scrollIntoView(): Promise<void> {
        return this.element.scrollIntoView()
    }

    async getAttribute(attribute: string): Promise<string> {
        return this.element.getAttribute(attribute)
    }

    async waitForDisplaying(): Promise<true | void> {
        return this.element.waitForDisplayed()
    }
}