import TextLabel from "../framework/textLabel"
import * as assert from "assert"
import BaseElement from "../framework/baseElement"
import {ProductGroup} from "./pageElements/productGroup";
import Button from "../framework/button";
import {BasePage} from "./basePage";

const GoodyCategory = {
    mobile: { url: 'https://catalog.onliner.by/mobile', title: 'Мобильные телефоны' }
}

export enum FilterLabel {
    Manufacturer = 'Производитель'
}

export enum MobileFilterValue {
    Honor = 'HONOR'
}

export enum SortingType {
    PriceDesc = 'Дорогие'
}

class GoodyCatalogPage extends BasePage{

    constructor(private readonly goodyCategory: { title: string; url: string }) {
        super()
    }

    get title(): TextLabel {
        return new TextLabel($('.schema-header__title'))
    }

    private get goodiesArea() {
        return $('#schema-products')
    }

    private get filteredOutGoodiesCountSection() {
        return $('.schema-filter-button__state_initial')
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

    async clickFilterItem(filterSection: BaseElement, filterValue: MobileFilterValue): Promise<void> {
        await (await (await filterSection).element.$(`//span[@class="schema-filter__checkbox-text"][text()="${filterValue}"]`)).click()
    }

    async verifyIfPageIsOpened(): Promise<void> {
        assert.strictEqual(await browser.getUrl(), this.goodyCategory.url)
        assert.strictEqual(await this.title.getText(), this.goodyCategory.title, 'Goody category is wrong')
    }

    async waitUntilGoodiesAreLoaded(): Promise<void> {
        await this.goodiesArea.waitUntil(async function () {
            return !(await this.getAttribute('class')).includes('processing')
        })
        //todo to fix
        await browser.pause(1000)
    }

    async getGoodiesCellsList(): Promise<ProductGroup[]> {
        const goodies = await (await this.goodiesArea).$$('.schema-product__group')
        const goodiesCellsList = []
        for (const goody of goodies) {
            goodiesCellsList.push(new ProductGroup(goody))
        }
        return goodiesCellsList
    }

    async selectSorting(sortingType: SortingType): Promise<void>{
        await this.sortButton.scrollAndClick()
        const sortTypeButton = new Button($((`//div[@class="schema-order__popover"]//span[text()="${sortingType}"]`)))
        await sortTypeButton.click()
    }
}

export const mobileCatalogPage = new GoodyCatalogPage(GoodyCategory.mobile)