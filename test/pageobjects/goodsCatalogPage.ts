import TextLabel from '../framework/elements/textLabel'
import {expect} from 'chai'
import BaseElement from '../framework/elements/baseElement'
import {ProductGroup} from './pageElements/productGroup'
import Button from '../framework/elements/button'
import {BasePage} from './basePage'
import CheckBox from '../framework/elements/checkBox'
import {ChainablePromiseElement} from 'webdriverio'

const GoodsCategory = {
    mobile: {url: 'https://catalog.onliner.by/mobile', title: 'Мобильные телефоны'},
    console: {url: 'https://catalog.onliner.by/console', title: 'Игровые приставки'}
}

export enum FilterLabel {
    Manufacturer = 'Производитель'
}

export enum FilterValue {
    Honor = 'HONOR'
}

export enum SortingType {
    PriceDesc = 'Дорогие'
}

class GoodsCatalogPage extends BasePage {

    constructor(private readonly goodsCategory: { title: string; url: string }) {
        super()
    }

    get title(): TextLabel {
        return new TextLabel($('.schema-header__title'))
    }

    private get contentArea(): ChainablePromiseElement<Promise<WebdriverIO.Element>> {
        return $('#schema-products')
    }

    get sortButton(): Button {
        return new Button($('.schema-order__link'))
    }

    get nextPageButton(): Button {
        return new Button($('#schema-pagination'))
    }

    getFilterSection(filterLabel: FilterLabel): BaseElement {
        return new BaseElement($((`//div[@class="schema-filter__label"]/span[text()="${filterLabel}"]/../following::div`)))
    }

    async clickFilterItem(filterSection: BaseElement, filterValue: FilterValue): Promise<void> {
        const filterCheckBox = new CheckBox(filterSection.element.$(`//span[@class="schema-filter__checkbox-text"][text()="${filterValue}"]`))
        await filterCheckBox.click()
    }

    async verifyIfPageIsOpened(): Promise<void> {
        await this.waitUntilGoodsAreLoaded()
        expect(await browser.getUrl()).eq(this.goodsCategory.url, 'Url is incorrect')
        expect(await this.title.getText()).eq(this.goodsCategory.title, 'Goods category is wrong')
    }

    async waitUntilGoodsAreLoaded(): Promise<void> {
        await this.contentArea.waitUntil(async function () {
            return !(await this.getAttribute('class')).includes('processing')
        })
    }

    async getGoodsCellsList(): Promise<ProductGroup[]> {
        return this.getItemsList(await this.contentArea.$$('.schema-product__group'), ProductGroup)
    }

    async selectSortingAndCheckIfIsApplied(sortingType: SortingType): Promise<void> {
        const firstGoodsElement = await this.contentArea.$('.schema-product__group')
        await this.sortButton.scrollAndClick()
        const sortTypeButton = new Button($((`//div[@class="schema-order__popover"]//span[text()="${sortingType}"]`)))
        await sortTypeButton.click()
        await browser.waitUntil(async () => {
            return !(firstGoodsElement.elementId === (await this.contentArea.$('.schema-product__group')).elementId)
        })
    }

    async selectFilterAndCheckIfIsApplied(filterLabel: FilterLabel, filterValue: FilterValue): Promise<void> {
        const firstGoodsElement = await this.contentArea.$('.schema-product__group')
        const brandFilterSection = await this.getFilterSection(filterLabel)
        await this.clickFilterItem(brandFilterSection, filterValue)
        await browser.waitUntil(async () => {
            return !(firstGoodsElement.elementId === (await this.contentArea.$('.schema-product__group')).elementId)
        })
    }

    async clickNextPageButtonAndCheckIfIsApplied(): Promise<void> {
        const firstGoodsElement = await this.contentArea.$('.schema-product__group')
        await this.nextPageButton.click()
        await browser.waitUntil(async () => {
            return !(firstGoodsElement.elementId === (await this.contentArea.$('.schema-product__group').elementId))
        })
    }
}

export const mobileCatalogPage = new GoodsCatalogPage(GoodsCategory.mobile)
export const consoleCatalogPage = new GoodsCatalogPage(GoodsCategory.console)