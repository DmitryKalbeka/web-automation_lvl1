import TextLabel from '../../framework/elements/textLabel'

export class ProductGroup{

    constructor(private readonly element: WebdriverIO.Element) {
    }

    get title(): TextLabel {
        return new TextLabel(this.element.$('[data-bind="html: product.extended_name || product.full_name"]'))
    }

    get price(): TextLabel {
        return new TextLabel(this.element.$(':is(.schema-product__price-value_primary, .schema-product__price-value_additional) span'))
    }
}