import TextLabel from '../framework/textLabel'
import {expect} from 'chai'
import BaseElement from '../framework/baseElement'
import {ProductGroup} from './pageElements/productGroup'
import Button from '../framework/button'
import {BasePage} from './basePage'

const GoodyCategory = {
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

class GoodyCatalogPage extends BasePage {

    constructor(private readonly goodyCategory: { title: string; url: string }) {
        super()
    }

    get title(): TextLabel {
        return new TextLabel($('.schema-header__title'))
    }

    private get goodiesArea() {
        return $('#schema-products')
    }

    get sortButton(): Button {
        return new Button($('.schema-order__link'))
    }

    get nextPageButton(): Button {
        return new Button($('#schema-pagination'))
    }

    async getFilterSection(filterLabel: FilterLabel): Promise<BaseElement> {
        return new BaseElement($((`//div[@class="schema-filter__label"]/span[text()="${filterLabel}"]/../following::div`)))
    }

    async clickFilterItem(filterSection: BaseElement, filterValue: FilterValue): Promise<void> {
        await (await (await filterSection).element.$(`//span[@class="schema-filter__checkbox-text"][text()="${filterValue}"]`)).click()
    }

    async verifyIfPageIsOpened(): Promise<void> {
        expect(await browser.getUrl()).eq(this.goodyCategory.url, 'Url is incorrect')
        expect(await this.title.getText()).eq(this.goodyCategory.title, 'Goody category is wrong')
    }

    async waitUntilGoodiesAreLoaded(): Promise<void> {
        await this.goodiesArea.waitUntil(async function () {
            return !(await this.getAttribute('class')).includes('processing')
        })
    }

    async getGoodiesCellsList(): Promise<ProductGroup[]> {
        return this.getItemsList(await (await this.goodiesArea).$$('.schema-product__group'), ProductGroup)
    }

    async selectSortingAndCheckIfIsApplied(sortingType: SortingType): Promise<void> {
        const firstGoodyElement = await (await this.goodiesArea).$('.schema-product__group')
        await this.sortButton.scrollAndClick()
        const sortTypeButton = new Button($((`//div[@class="schema-order__popover"]//span[text()="${sortingType}"]`)))
        await sortTypeButton.click()
        await browser.waitUntil(async () => {
            return !(firstGoodyElement.elementId === (await (await this.goodiesArea).$('.schema-product__group')).elementId)
        })
    }

    async selectFilterAndCheckIfIsApplied(filterLabel: FilterLabel, filterValue: FilterValue): Promise<void> {
        const firstGoodyElement = await (await this.goodiesArea).$('.schema-product__group')
        const brandFilterSection = await this.getFilterSection(filterLabel)
        await this.clickFilterItem(brandFilterSection, filterValue)
        await browser.waitUntil(async () => {
            return !(firstGoodyElement.elementId === (await (await this.goodiesArea).$('.schema-product__group')).elementId)
        })
    }

    async clickNextPageButtonAndCheckIfIsApplied(): Promise<void> {
        const firstGoodyElement = await (await this.goodiesArea).$('.schema-product__group')
        await this.nextPageButton.click()
        await browser.waitUntil(async () => {
            return !(firstGoodyElement.elementId === (await (await this.goodiesArea).$('.schema-product__group')).elementId)
        })
    }
}

export const mobileCatalogPage = new GoodyCatalogPage(GoodyCategory.mobile)
export const consoleCatalogPage = new GoodyCatalogPage(GoodyCategory.console)