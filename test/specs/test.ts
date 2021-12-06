import {expect} from 'chai'
import {homePage, TopNavigationItem} from '../pageobjects/homePage'
import {catalogPage} from '../pageobjects/catalogPage'
import {FilterLabel, mobileCatalogPage, FilterValue, SortingType} from '../pageobjects/goodyCatalogPage'
import {verifyIfGoodiesTitleContains, verifyIfPriceSortingIsCorrect} from '../helpers/goodyCatalogHelper'

describe('Onliner Test', async () => {
    it('TestCase 1', async () => {
        // go to home page
        await browser.maximizeWindow()
        await browser.url(browser.options.baseUrl)
        expect(await browser.getTitle()).eq('Onliner')
        // go to catalog
        await (await homePage.getNavigationMenuItemByName(TopNavigationItem.Catalog)).click()
        expect(await browser.getTitle()).eq('Каталог Onlíner')
        // go to Mobile phones tab
        await catalogPage.goToMobileCatalog()
        await mobileCatalogPage.verifyIfPageIsOpened()
        // filter out by manufacturer = "HONOR"
        await mobileCatalogPage.waitUntilGoodiesAreLoaded()
        await mobileCatalogPage.selectFilterAndCheckIfIsApplied(FilterLabel.Manufacturer, FilterValue.Honor)
        await verifyIfGoodiesTitleContains(FilterValue.Honor)
        await mobileCatalogPage.clickNextPageButtonAndCheckIfIsApplied()
        await verifyIfGoodiesTitleContains(FilterValue.Honor)
        // sort by price
        await mobileCatalogPage.selectSortingAndCheckIfIsApplied(SortingType.PriceDesc)
        await verifyIfPriceSortingIsCorrect()
    });
});