import { ChainablePromiseElement } from 'webdriverio'
import BaseElement from './baseElement'

export default class TextField extends BaseElement {
    constructor(element: ChainablePromiseElement<Promise<WebdriverIO.Element>>) {
        super(element);
    }

    async enterText(text: string): Promise<void> {
        return (await this.element).addValue(text)
    }

    async replaceText(text: string): Promise<void> {
        return (await this.element).setValue(text)
    }
}