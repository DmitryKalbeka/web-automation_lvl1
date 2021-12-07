import { ChainablePromiseElement } from 'webdriverio'
import BaseElement from './baseElement'

export default class Button extends BaseElement {
    constructor(element: ChainablePromiseElement<Promise<WebdriverIO.Element>>) {
        super(element);
    }

    async scrollAndClick(): Promise<void> {
        await this.scrollIntoView()
        return this.element.click()
    }

    async waitForClickable(): Promise<void | true> {
        return this.element.waitForClickable()
    }

    async waitForClickableAndClick(): Promise<void | true> {
        await this.waitForClickable()
        return this.click()
    }

    async hoverWaitForDisplaying(): Promise<void | true> {
        await this.hover()
        return this.waitForDisplaying()
    }
}