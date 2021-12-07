import Button from '../../framework/button'
import TextLabel from '../../framework/textLabel';
import {extractPriceValueFromLabel} from '../../utilites/utilites'

export class ProductProposal{
    constructor(private readonly element: WebdriverIO.Element) {
    }

    get addToCartButton(): Button {
        return new Button(this.element.$('.button-style_expletive'))
    }

    get goToCartButton(): Button {
        return new Button(this.element.$('.button-style_primary'))
    }

    private get priceLabel(): TextLabel {
        return new TextLabel(this.element.$('.product-aside__price--primary'))
    }

    async getPrice(): Promise<number> {
        return extractPriceValueFromLabel(await this.priceLabel.getText())
    }

    async hover(): Promise<void> {
        return this.element.moveTo()
    }
}