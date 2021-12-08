import {expect} from 'chai'
import {BasePage} from './basePage'
import TextLabel from '../framework/elements/textLabel'
import {CartGoods} from './pageElements/cartGoods'

class CartPage extends BasePage{

    get title(): TextLabel {
        return new TextLabel($('.cart-form__title'))
    }

    async verifyIfPageIsLoaded(): Promise<void> {
        await this.waitUntilPageIsLoaded()
        expect(await this.title.getText()).eq('Корзина', 'Page title is invalid')
    }

    async getCartGoods(): Promise<CartGoods[]> {
        return this.getItemsList(await $$('.cart-form__offers-list .cart-form__offers-unit'), CartGoods)
    }
}

export const cartPage = new CartPage()