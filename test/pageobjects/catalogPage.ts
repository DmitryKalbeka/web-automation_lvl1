import Button from '../framework/elements/button'
import {expect} from 'chai'
import {BasePage} from './basePage'

export enum NavigationBarItem {
    Electronic = 'Электроника'
}

export enum GoodsGroupName {
    MobileAndAccessories = 'Мобильные телефоны и',
    VideoGames = 'Видеоигры'
}

export enum CategoryName {
    Mobile = ' Смартфоны ',
    Console = ' Игровые приставки '
}

class CatalogPage extends BasePage{
    getNavigationBarItemByName(name: NavigationBarItem): Button {
        return new Button($((`//span[@class="catalog-navigation-classifier__item-title-wrapper"][text()="${name}"]/../..`)))
    }

    getCategoryInListByName(name: GoodsGroupName): Button {
        return new Button($((`//div[@class="catalog-navigation-list__aside-title"][contains(.,"${name}")]/..`)))
    }

    getCategoryByName(name: CategoryName): Button {
        return new Button($((`//span[@class="catalog-navigation-list__dropdown-title"][text()="${name}"]/..`)))
    }

    async goToCatalog(navigationBarItem: NavigationBarItem, goodsGroupName: GoodsGroupName, categoryName: CategoryName): Promise<void> {
        await this.getNavigationBarItemByName(navigationBarItem).click()
        const categoryGroupButton = await this.getCategoryInListByName(goodsGroupName)
        expect(await categoryGroupButton.isDisplayed(), `${goodsGroupName} button does not appear`).to.be.ok
        await categoryGroupButton.hover()
        const categoryButton = await this.getCategoryByName(categoryName)
        expect(await categoryButton.isDisplayed(), `${categoryName} category does not appear`).to.be.ok
        await categoryButton.click()
    }

    async goToMobileCatalog(): Promise<void> {
        await this.goToCatalog(NavigationBarItem.Electronic, GoodsGroupName.MobileAndAccessories, CategoryName.Mobile)
    }

    async goToConsoleCatalog(): Promise<void> {
        await this.goToCatalog(NavigationBarItem.Electronic, GoodsGroupName.VideoGames, CategoryName.Console)
    }
}

export const catalogPage = new CatalogPage()