import {expect} from 'chai'
import {BasePage} from './basePage'
import TextLabel from '../framework/textLabel'
import {CartGoody} from './pageElements/cartGoody'

class CartPage extends BasePage{

    get title(): TextLabel {
        return new TextLabel($('.cart-form__title'))
    }

    async verifyIfPageIsLoaded(): Promise<void> {
        await this.waitUntilPageIsLoaded()
        expect(await this.title.getText()).eq('Корзина', 'Page title is invalid')
    }

    async getCartGoodies(): Promise<CartGoody[]> {
        return this.getItemsList(await $$('.cart-form__offers-list .cart-form__offers-unit'), CartGoody)
    }
}

export const cartPage = new CartPage()