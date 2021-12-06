import { ChainablePromiseElement } from 'webdriverio'
import BaseElement from './baseElement'

export default class Button extends BaseElement {
    constructor(element: ChainablePromiseElement<Promise<WebdriverIO.Element>>) {
        super(element);
    }

    async click(): Promise<void> {
        return (await this.element).click()
    }

    async scrollAndClick(): Promise<void> {
        await this.scrollIntoView()
        return (await this.element).click()
    }

    async waitForClickable(): Promise<void | true> {
        return (await this.element).waitForClickable()
    }
}