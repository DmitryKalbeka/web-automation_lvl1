import Button from '../framework/elements/button'
import {BasePage} from './basePage'

export enum TopNavigationItem {
    Catalog = 'Каталог',
    Services = 'Услуги'
}

class HomePage extends BasePage {

    get logInButton(): Button {
        return new Button($('.auth-bar__item--text'))
    }

    getNavigationMenuItemByName(name: TopNavigationItem): Button {
        return new Button($((`//span[@class="b-main-navigation__text"][text()="${name}"]/..`)))
    }
}

export const homePage = new HomePage()