import TextLabel from '../../framework/elements/textLabel'

export class CartGoods{
    constructor(private readonly element: WebdriverIO.Element) {
    }

    get title(): TextLabel {
        return new TextLabel(this.element.$('.cart-form__link'))
    }

    get price(): TextLabel {
        return new TextLabel(this.element.$('.cart-form__offers-part_action .cart-form__offers-part_price span'))
    }
}