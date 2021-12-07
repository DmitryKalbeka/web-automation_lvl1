import TextLabel from '../../framework/textLabel'
import {extractPriceValueFromLabel} from '../../utilites/utilites'

export class ProductGroup{

    constructor(private readonly element: WebdriverIO.Element) {
    }

    private get titleLabel() {
        return new TextLabel(this.element.$('[data-bind="html: product.extended_name || product.full_name"]'))
    }

    private get priceLabel() {
        return new TextLabel(this.element.$(':is(.schema-product__price-value_primary, .schema-product__price-value_additional) span'))
    }

    async clickTitle(): Promise<void> {
        return this.titleLabel.click()
    }

    async getTitle(): Promise<string> {
        return (await this.titleLabel).getText()
    }

    async getPrice(): Promise<number> {
        return extractPriceValueFromLabel(await (await this.priceLabel).getText())
    }
}