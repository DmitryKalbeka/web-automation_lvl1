import TextLabel from '../framework/elements/textLabel'
import {BasePage} from './basePage'
import Button from '../framework/elements/button'
import {TopicCell} from './pageElements/topicCell'

class ForumLastPostsPage extends BasePage {

    get title(): TextLabel {
        return new TextLabel($('.m-title'))
    }

    get navigateToLastPageButton(): Button {
        return new Button($('.pages-fastnav li:nth-last-child(2)'))
    }

    async getTopicsList(): Promise<TopicCell[]> {
        return this.getItemsList(await $$('.b-list-topics li'), TopicCell)
    }
}

export const forumLastPostsPage = new ForumLastPostsPage()
