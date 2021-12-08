import {expect} from 'chai'
import {homePage, TopNavigationItem} from '../pageobjects/homePage'
import {catalogPage} from '../pageobjects/catalogPage'
import {consoleCatalogPage, FilterLabel, mobileCatalogPage, SortingType, FilterValue as GoodyFilterValue} from '../pageobjects/goodyCatalogPage'
import {verifyIfGoodiesTitleContains, verifyIfPriceSortingIsCorrect} from '../helpers/goodyCatalogHelper'
import {logInPage} from '../pageobjects/logInPage'
import {signUpPage} from '../pageobjects/signUpPage'
import * as faker from 'faker'
import {goodyPage} from "../pageobjects/goodyPage";
import {cartPage} from "../pageobjects/cartPage";
import {FilterValue as ServiceFilterValue, servicesPage} from "../pageobjects/servicesPage";

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
        await mobileCatalogPage.selectFilterAndCheckIfIsApplied(FilterLabel.Manufacturer, GoodyFilterValue.Honor)
        await verifyIfGoodiesTitleContains(GoodyFilterValue.Honor)
        await mobileCatalogPage.clickNextPageButtonAndCheckIfIsApplied()
        await verifyIfGoodiesTitleContains(GoodyFilterValue.Honor)
        // sort by price
        await mobileCatalogPage.selectSortingAndCheckIfIsApplied(SortingType.PriceDesc)
        await verifyIfPriceSortingIsCorrect()
    });

    it.skip('TestCase 2', async () => {
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

    it.skip('TestCase 3', async () => {
        // go to catalog
        await (await homePage.getNavigationMenuItemByName(TopNavigationItem.Catalog)).click()
        expect(await browser.getTitle()).eq('Каталог Onlíner')
        // go to Console page
        await catalogPage.goToConsoleCatalog()
        await consoleCatalogPage.verifyIfPageIsOpened()
        // open the first goody and add to cart
        const firstGoody = (await consoleCatalogPage.getGoodiesCellsList())[0]
        const firstGoodyTitle = await firstGoody.getTitle()
        await firstGoody.clickTitle()
        await goodyPage.waitUntilPageIsLoaded()
        expect(await goodyPage.titleLabel.waitAndGetText()).eq(firstGoodyTitle, 'Opened page title is incorrect')
        const proposal = (await goodyPage.getProposalsList())[1]
        const proposalPrice = await proposal.getPrice()
        await proposal.hover()
        expect(await proposal.addToCartButton.getText()).eq('В корзину', 'To Cart button is not shown')
        await proposal.addToCartButton.click()
        await proposal.goToCartButton.waitForDisplaying()
        expect(await proposal.addToCartButton.isDisplayed(), 'Add To Cart button is still shown').to.be.false
        expect(await proposal.goToCartButton.getText()).eq('В корзине', 'To Cart button is not shown')
        // go to cart
        await proposal.goToCartButton.click()
        await cartPage.verifyIfPageIsLoaded()
        const cartGoodies = await cartPage.getCartGoodies()
        expect(cartGoodies.length).eq(1, 'Goodies count is incorrect')
        expect(await cartGoodies[0].getTitle()).eq(firstGoodyTitle, 'Goody title is incorrect')
        expect(await cartGoodies[0].getPrice()).eq(proposalPrice, 'Goody price is incorrect')
    });

    it('TestCase 4', async () => {
        // go to 'Services' tab
        await (await homePage.getNavigationMenuItemByName(TopNavigationItem.Services)).click()
        expect(await browser.getTitle()).eq('Заказы на услуги')
        // sort by 'Uncompleted'
        await servicesPage.selectStatusFilterAndCheckIfIsApplied(ServiceFilterValue.Uncompleted)
        const services = await servicesPage.getServicesCellsList()
        for (const service of services) {
            expect(await service.status.getText()).eq('Не выполнен', 'Status is incorrect')
        }
        // to check overall count
        expect(await servicesPage.getFilteredCount()).gte(1, 'Count is less than 1')
        // to check image of each service
        for (const service of services) {
            expect(await service.image.isExisting(), 'Image is absent').to.be.true
        }
    });
});