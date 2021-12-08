import {BasePage} from './basePage'
import Button from '../framework/elements/button'

class ForumPage extends BasePage {

    get newInLast24h(): Button {
        return new Button($(('//span[text()="Новое за 24 часа"]')))
    }
}

export const forumPage = new ForumPage()
