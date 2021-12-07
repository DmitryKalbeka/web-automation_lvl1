import {mobileCatalogPage} from '../pageobjects/goodyCatalogPage'
import {expect} from 'chai'

export async function verifyIfGoodiesTitleContains(expectedTitle: string): Promise<void> {
    const goodiesList = await mobileCatalogPage.getGoodiesCellsList()
    for await (const goodiesListElement of goodiesList) {
        expect(await goodiesListElement.getTitle()).to.contains(expectedTitle, 'Item title is incorrect')
    }
}

export async function verifyIfPriceSortingIsCorrect(descSorting = true): Promise<void> {
    const goodiesList = await mobileCatalogPage.getGoodiesCellsList()
    let previousElementPrice = -1
    for (const goodiesListElement of goodiesList) {
        const currentElementPrice = await goodiesListElement.getPrice()
        if (previousElementPrice === -1) {
            previousElementPrice = currentElementPrice
            continue
        }
        if (descSorting) {
            expect(previousElementPrice).gte(currentElementPrice, 'Sorting is incorrect')
        } else {
            expect(previousElementPrice).lte(currentElementPrice, 'Sorting is incorrect')
        }
        previousElementPrice = currentElementPrice
    }
}