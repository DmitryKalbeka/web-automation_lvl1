import Button from '../framework/button'
import {expect} from 'chai'
import {BasePage} from './basePage'

export enum NavigationBarItem {
    Electronic = 'Электроника'
}

export enum GoodiesGroupName {
    MobileAndAccessories = 'Мобильные телефоны и'
}

export enum CategoryName {
    Mobile = ' Смартфоны '
}

class CatalogPage extends BasePage{
    async getNavigationBarItemByName(name: NavigationBarItem): Promise<Button> {
        return new Button($((`//span[@class="catalog-navigation-classifier__item-title-wrapper"][text()="${name}"]/../..`)))
    }

    async getCategoryInListByName(name: GoodiesGroupName): Promise<Button> {
        return new Button($((`//div[@class="catalog-navigation-list__aside-title"][text()[contains(.,"${name}")]]/..`)))
    }

    async getCategoryByName(name: CategoryName): Promise<Button> {
        return new Button($((`//span[@class="catalog-navigation-list__dropdown-title"][text()="${name}"]/..`)))
    }

    async goToMobileCatalog(): Promise<void> {
        await (await this.getNavigationBarItemByName(NavigationBarItem.Electronic)).click()
        const mobileAndAccessories = await this.getCategoryInListByName(GoodiesGroupName.MobileAndAccessories)
        expect(await mobileAndAccessories.isDisplayed(), 'Mobile and accessories button does not appear').to.be.ok
        await mobileAndAccessories.click()
        const mobile = await this.getCategoryByName(CategoryName.Mobile)
        expect(await mobile.isDisplayed(), 'Mobile category does not appear').to.be.ok
        await mobile.click()
    }
}

export const catalogPage = new CatalogPage()