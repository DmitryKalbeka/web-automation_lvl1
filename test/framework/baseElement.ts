import { ChainablePromiseElement } from 'webdriverio'

export default class BaseElement {

    constructor(public readonly element: ChainablePromiseElement<Promise<WebdriverIO.Element>>) {}

    async isDisplayed(): Promise<boolean> {
        return (await this.element).isDisplayed()
    }

    async getText(): Promise<string> {
        return (await this.element).getText()
    }

    async scrollIntoView(): Promise<void> {
        return (await this.element).scrollIntoView()
    }

    async getAttribute(attribute: string): Promise<string> {
        return (await this.element).getAttribute(attribute)
    }
}