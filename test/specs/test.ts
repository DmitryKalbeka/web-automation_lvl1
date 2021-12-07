import {expect} from 'chai'
import {homePage, TopNavigationItem} from '../pageobjects/homePage'
import {catalogPage} from '../pageobjects/catalogPage'
import {FilterLabel, mobileCatalogPage, FilterValue, SortingType} from '../pageobjects/goodyCatalogPage'
import {verifyIfGoodiesTitleContains, verifyIfPriceSortingIsCorrect} from '../helpers/goodyCatalogHelper'
import {logInPage} from '../pageobjects/logInPage'
import {signUpPage} from '../pageobjects/signUpPage'
import * as faker from 'faker'

describe('Onliner Test', async () => {
    beforeEach(async () => {
        await browser.maximizeWindow()
        await browser.url(browser.options.baseUrl)
        expect(await browser.getTitle()).eq('Onliner')
    })

    it.skip('TestCase 1', async () => {
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

    it('TestCase 2', async () => {
        // go to Log In -> Sign Up
        await homePage.logInButton.click()
        await logInPage.signUpLink.click()
        expect(await signUpPage.title.getText()).eq('Регистрация', 'Page title is incorrect')
        // enter invalid email into 'email' field
        await signUpPage.emailField.enterText(faker.lorem.words(1))
        expect(await signUpPage.emailFieldValidationLabel.waitAndGetText()).eq('Некорректный e-mail', 'Validation message is incorrect')
        // enter password less than 8 characters into 'password' field
        await signUpPage.passwordField.enterText(faker.internet.password(7))
        expect(await signUpPage.passwordFieldValidationLabel.waitAndGetText()).eq('Минимум 8 символов', 'Validation message is incorrect')
        // enter valid password into 'password' field and different valid password into 'repeat password' field
        await signUpPage.passwordField.replaceText(faker.internet.password(10))
        await signUpPage.repeatPasswordField.enterText(faker.internet.password(10))
        expect(await signUpPage.repeatPasswordFieldValidationLabel.waitAndGetText()).eq('Пароли не совпадают', 'Validation message is incorrect')
    });
});