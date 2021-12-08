import { ChainablePromiseElement } from 'webdriverio'
import BaseElement from './baseElement'

export default class TextLabel extends BaseElement {
    constructor(element: ChainablePromiseElement<Promise<WebdriverIO.Element>>) {
        super(element);
    }
}