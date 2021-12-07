import TextLabel from '../../framework/textLabel'
import {extractPriceValueFromLabel} from '../../utilites/utilites'

export class CartGoody{
    constructor(private readonly element: WebdriverIO.Element) {
    }

    private get titleLabel(): TextLabel {
        return new TextLabel(this.element.$('.cart-form__link'))
    }

    private get priceLabel(): TextLabel {
        return new TextLabel(this.element.$('.cart-form__offers-part_action .cart-form__offers-part_price span'))
    }

    async getTitle(): Promise<string> {
        return (await this.titleLabel).getText()
    }

    async getPrice(): Promise<number> {
        return extractPriceValueFromLabel(await this.priceLabel.getText())
    }
}