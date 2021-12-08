import Button from '../framework/button'
import {BasePage} from './basePage'

export enum TopNavigationItem {
    Catalog = 'Каталог',
    Services = 'Услуги'
}

class HomePage extends BasePage {

    get logInButton(): Button {
        return new Button($('.auth-bar__item--text'))
    }

    async getNavigationMenuItemByName(name: TopNavigationItem): Promise<Button> {
        return new Button($((`//span[@class="b-main-navigation__text"][text()="${name}"]/..`)))
    }
}

export const homePage = new HomePage()