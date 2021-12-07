import TextLabel from '../framework/textLabel'
import {BasePage} from './basePage'
import {ProductProposal} from './pageElements/productProposal'

class GoodyPage extends BasePage {

    get titleLabel(): TextLabel {
        return new TextLabel($('.catalog-masthead__title'))
    }

    async getProposalsList(): Promise<ProductProposal[]> {
        return this.getItemsList(await $$('.product-aside__group .product-aside__item-i'), ProductProposal)
    }
}

export const goodyPage = new GoodyPage()
