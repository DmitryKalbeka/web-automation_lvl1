import {mobileCatalogPage} from '../pageobjects/goodsCatalogPage'
import {expect} from 'chai'
import {extractPriceValueFromLabel} from '../utilites/utilites'

export async function verifyIfGoodsTitleContains(expectedTitle: string): Promise<void> {
    const goodsList = await mobileCatalogPage.getGoodsCellsList()
    for await (const goodsListElement of goodsList) {
        expect(await goodsListElement.title.getText()).to.contains(expectedTitle, 'Item title is incorrect')
    }
}

export async function verifyIfPriceSortingIsCorrect(descSorting = true): Promise<void> {
    const goodsList = await mobileCatalogPage.getGoodsCellsList()
    let previousElementPrice = -1
    for (const goodsListElement of goodsList) {
        const currentElementPrice = extractPriceValueFromLabel(await goodsListElement.price.getText())
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