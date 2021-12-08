import TextLabel from '../framework/textLabel'
import {BasePage} from './basePage'
import {ServiceCell} from "./pageElements/serviceCell";
import {extractCountFromLabel} from "../utilites/utilites";
import CheckBox from "../framework/checkBox";

export enum FilterValue {
    Uncompleted = 'Невыполненные'
}

class ServicesPage extends BasePage {

    get title(): TextLabel {
        return new TextLabel($('.schema-header__title'))
    }

    get itemsCountLabel(): TextLabel {
        return new TextLabel($('.service-interaction__sub_main'))
    }

    private get contentArea() {
        return $('.service-filter__part_2')
    }

    async clickStatusFilter(filterValue: FilterValue): Promise<void> {
        const filterCheckBox = new CheckBox($((`//div[@property="status"]//span[text()="${filterValue}"]`)))
        await filterCheckBox.scrollIntoView()
        await filterCheckBox.click()
    }

    async waitUntilContentAreLoaded(): Promise<void> {
        await this.contentArea.waitUntil(async function () {
            return !(await this.getAttribute('class')).includes('processing')
        })
    }

    async getServicesCellsList(): Promise<ServiceCell[]> {
        return this.getItemsList(await (await this.contentArea).$$('.service-offers__unit'), ServiceCell)
    }

    async selectStatusFilterAndCheckIfIsApplied(filterValue: FilterValue): Promise<void> {
        const firstElement = await (await this.contentArea).$('.service-offers__unit')
        await this.clickStatusFilter(filterValue)
        await browser.waitUntil(async () => {
            return !(firstElement.elementId === (await (await this.contentArea).$('.service-offers__unit')).elementId)
        })
    }

    async getFilteredCount(): Promise<number> {
        return extractCountFromLabel(await this.itemsCountLabel.getText())
    }
}

export const servicesPage = new ServicesPage()
