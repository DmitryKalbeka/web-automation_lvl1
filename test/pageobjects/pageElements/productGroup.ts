import TextLabel from "../../framework/textLabel";
import {extractPriceValueFromLabel} from "../../utilites/utilites";

export class ProductGroup {

    constructor(private readonly element: WebdriverIO.Element) {
    }

    private get titleElement() {
        return new TextLabel(this.element.$('[data-bind="html: product.extended_name || product.full_name"]'))
    }

    private get priceElement() {
        return new TextLabel(this.element.$(':is(.schema-product__price-value_primary, .schema-product__price-value_additional) span'))
    }

    async getTitle(): Promise<string> {
        return (await this.titleElement).getText()
    }

    async getPrice(): Promise<number> {
        return extractPriceValueFromLabel(await (await this.priceElement).getText())
    }
}