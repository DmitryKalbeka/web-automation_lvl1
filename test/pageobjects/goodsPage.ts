import TextLabel from '../framework/elements/textLabel'
import {BasePage} from './basePage'
import {ProductProposal} from './pageElements/productProposal'

class GoodsPage extends BasePage {

    get titleLabel(): TextLabel {
        return new TextLabel($('.catalog-masthead__title'))
    }

    async getProposalsList(): Promise<ProductProposal[]> {
        return this.getItemsList(await $$('.product-aside__group .product-aside__item-i'), ProductProposal)
    }
}

export const goodsPage = new GoodsPage()
