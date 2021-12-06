import * as assert from 'assert'
import {homePage, TopNavigationItem} from '../pageobjects/homePage'
import {catalogPage} from '../pageobjects/catalogPage'
import {FilterLabel, mobileCatalogPage, MobileFilterValue, SortingType} from '../pageobjects/goodyCatalogPage';
import {verifyIfGoodiesTitleContains, verifyIfPriceSortingIsCorrect} from '../helpers/goodyCatalogHelper';

describe('Onliner Test', async () => {
    it('TestCase 1', async () => {
        // go to home page
        await browser.maximizeWindow()
        await browser.url(browser.options.baseUrl)
        assert.strictEqual(await browser.getTitle(), 'Onliner')
        // go to catalog
        await (await homePage.getNavigationMenuItemByName(TopNavigationItem.Catalog)).click()
        assert.strictEqual(await browser.getTitle(), 'Каталог Onlíner')
        // go to Mobile phones tab
        await catalogPage.goToMobileCatalog()
        await mobileCatalogPage.verifyIfPageIsOpened()
        // filter out by manufacturer = "HONOR"
        await mobileCatalogPage.waitUntilGoodiesAreLoaded()
        const brandFilterSection = await mobileCatalogPage.getFilterSection(FilterLabel.Manufacturer)
        await mobileCatalogPage.clickFilterItem(brandFilterSection, MobileFilterValue.Honor)
        await verifyIfGoodiesTitleContains(MobileFilterValue.Honor)
        await mobileCatalogPage.nextPageButton.click()
        await verifyIfGoodiesTitleContains(MobileFilterValue.Honor)
        // sort by price
        await mobileCatalogPage.selectSorting(SortingType.PriceDesc)
        await verifyIfPriceSortingIsCorrect()
    });
});