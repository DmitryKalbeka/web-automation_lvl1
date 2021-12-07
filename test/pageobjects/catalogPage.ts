import Button from '../framework/button'
import {expect} from 'chai'
import {BasePage} from './basePage'

export enum NavigationBarItem {
    Electronic = 'Электроника'
}

export enum GoodiesGroupName {
    MobileAndAccessories = 'Мобильные телефоны и',
    VideoGames = 'Видеоигры'
}

export enum CategoryName {
    Mobile = ' Смартфоны ',
    Console = ' Игровые приставки '
}

class CatalogPage extends BasePage{
    async getNavigationBarItemByName(name: NavigationBarItem): Promise<Button> {
        return new Button($((`//span[@class="catalog-navigation-classifier__item-title-wrapper"][text()="${name}"]/../..`)))
    }

    async getCategoryInListByName(name: GoodiesGroupName): Promise<Button> {
        return new Button($((`//div[@class="catalog-navigation-list__aside-title"][contains(.,"${name}")]/..`)))
    }

    async getCategoryByName(name: CategoryName): Promise<Button> {
        return new Button($((`//span[@class="catalog-navigation-list__dropdown-title"][text()="${name}"]/..`)))
    }

    async goToCatalog(navigationBarItem: NavigationBarItem, goodiesGroupName: GoodiesGroupName, categoryName: CategoryName): Promise<void> {
        await (await this.getNavigationBarItemByName(navigationBarItem)).click()
        const categoryGroupButton = await this.getCategoryInListByName(goodiesGroupName)
        expect(await categoryGroupButton.isDisplayed(), `${goodiesGroupName} button does not appear`).to.be.ok
        await categoryGroupButton.hover()
        const categoryButton = await this.getCategoryByName(categoryName)
        expect(await categoryButton.isDisplayed(), `${categoryName} category does not appear`).to.be.ok
        await categoryButton.click()
    }

    async goToMobileCatalog(): Promise<void> {
        await this.goToCatalog(NavigationBarItem.Electronic, GoodiesGroupName.MobileAndAccessories, CategoryName.Mobile)
    }

    async goToConsoleCatalog(): Promise<void> {
        await this.goToCatalog(NavigationBarItem.Electronic, GoodiesGroupName.VideoGames, CategoryName.Console)
    }
}

export const catalogPage = new CatalogPage()