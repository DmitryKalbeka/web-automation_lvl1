import TextLabel from '../framework/elements/textLabel'
import {BasePage} from './basePage'
import {ProductProposal} from './pageElements/productProposal'
import Button from '../framework/elements/button'
import BaseElement from '../framework/elements/baseElement'
import {TIMEOUT} from '../framework/constants'

class GoodsPage extends BasePage {

    get titleLabel(): TextLabel {
        return new TextLabel($('.catalog-masthead__title'))
    }

    async getProposalsList(): Promise<ProductProposal[]> {
        return this.getItemsList(await $$('.product-aside__group .product-aside__item-i'), ProductProposal)
    }

    get leftSidePanelGoToCartButton(): Button {
        return new Button($('.product-recommended__sidebar .button-style_another'))
    }

    private get leftSideBar(): BaseElement {
        return new BaseElement($('.product-recommended__sidebar-overflow'))
    }

    async isLeftSideBarShown(): Promise<boolean> {
        return this.leftSideBar.waitForDisplaying(true, {timeout: TIMEOUT.SHORT, interval: TIMEOUT.INTERVAL})
    }
}

export const goodsPage = new GoodsPage()
