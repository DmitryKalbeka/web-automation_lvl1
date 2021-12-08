import Button from '../../framework/elements/button'
import TextLabel from '../../framework/elements/textLabel'

export class ProductProposal{
    constructor(private readonly element: WebdriverIO.Element) {
    }

    get addToCartButton(): Button {
        return new Button(this.element.$('.button-style_expletive'))
    }

    get goToCartButton(): Button {
        return new Button(this.element.$('.button-style_primary'))
    }

    get price(): TextLabel {
        return new TextLabel(this.element.$('.product-aside__price--primary'))
    }

    async hover(): Promise<void> {
        return this.element.moveTo()
    }
}