import Button from '../framework/button'
import {BasePage} from './basePage'

export enum TopNavigationItem {
    Catalog = 'Каталог'
}

class HomePage extends BasePage {

    async getNavigationMenuItemByName(name: TopNavigationItem): Promise<Button> {
        return new Button($((`//span[@class="b-main-navigation__text"][text()="${name}"]/..`)))
    }
}

export const homePage = new HomePage()