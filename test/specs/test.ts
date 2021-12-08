import {expect} from 'chai'
import {homePage, TopNavigationItem} from '../pageobjects/homePage'
import {catalogPage} from '../pageobjects/catalogPage'
import {consoleCatalogPage, FilterLabel, mobileCatalogPage, SortingType, FilterValue as GoodsFilterValue} from '../pageobjects/goodsCatalogPage'
import {verifyIfGoodsTitleContains, verifyIfPriceSortingIsCorrect} from '../helpers/goodsCatalogHelper'
import {logInPage} from '../pageobjects/logInPage'
import {signUpPage} from '../pageobjects/signUpPage'
import * as faker from 'faker'
import {goodsPage} from '../pageobjects/goodsPage'
import {cartPage} from '../pageobjects/cartPage'
import {FilterValue as ServiceFilterValue, servicesPage} from '../pageobjects/servicesPage'
import {extractPriceValueFromLabel, extractTopicsCount} from '../utilites/utilites'
import {forumPage} from '../pageobjects/forumPage'
import {forumLastPostsPage} from "../pageobjects/forumLastPostsPage";

describe('Onliner Test', async () => {
    beforeEach(async () => {
        await browser.maximizeWindow()
        await browser.url(browser.options.baseUrl)
        expect(await browser.getTitle()).eq('Onliner')
    })

    it('TestCase 1', async () => {
        // go to catalog
        await homePage.getNavigationMenuItemByName(TopNavigationItem.Catalog).click()
        expect(await browser.getTitle()).eq('Каталог Onlíner')
        // go to Mobile phones tab
        await catalogPage.goToMobileCatalog()
        await mobileCatalogPage.verifyIfPageIsOpened()
        // filter out by manufacturer = "HONOR"
        await mobileCatalogPage.waitUntilGoodsAreLoaded()
        await mobileCatalogPage.selectFilterAndCheckIfIsApplied(FilterLabel.Manufacturer, GoodsFilterValue.Honor)
        await verifyIfGoodsTitleContains(GoodsFilterValue.Honor)
        await mobileCatalogPage.clickNextPageButtonAndCheckIfIsApplied()
        await verifyIfGoodsTitleContains(GoodsFilterValue.Honor)
        // sort by price
        await mobileCatalogPage.selectSortingAndCheckIfIsApplied(SortingType.PriceDesc)
        await verifyIfPriceSortingIsCorrect()
    })

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
    })

    it('TestCase 3', async () => {
        // go to catalog
        await homePage.getNavigationMenuItemByName(TopNavigationItem.Catalog).click()
        expect(await browser.getTitle()).eq('Каталог Onlíner')
        // go to Console page
        await catalogPage.goToConsoleCatalog()
        await consoleCatalogPage.verifyIfPageIsOpened()
        // open the first goods and add to cart
        const firstGoods = (await consoleCatalogPage.getGoodsCellsList())[0]
        const firstGoodsTitle = await firstGoods.title.getText()
        await firstGoods.title.click()
        await goodsPage.waitUntilPageIsLoaded()
        expect(await goodsPage.titleLabel.waitAndGetText()).eq(firstGoodsTitle, 'Opened page title is incorrect')
        const proposal = (await goodsPage.getProposalsList())[0]
        const proposalPrice = extractPriceValueFromLabel(await proposal.price.getText())
        await proposal.hover()
        expect(await proposal.addToCartButton.getText()).eq('В корзину', 'To Cart button is not shown')
        await proposal.addToCartButton.click()
        await proposal.goToCartButton.waitForDisplaying()
        expect(await proposal.addToCartButton.isDisplayed(), 'Add To Cart button is still shown').to.be.false
        expect(await proposal.goToCartButton.getText()).eq('В корзине', 'To Cart button is not shown')
        // go to cart
        await proposal.goToCartButton.click()
        await cartPage.verifyIfPageIsLoaded()
        const cartGoods = await cartPage.getCartGoods()
        expect(cartGoods.length).eq(1, 'Goods count is incorrect')
        expect(await cartGoods[0].title.getText()).eq(firstGoodsTitle, 'Goods title is incorrect')
        expect(extractPriceValueFromLabel(await cartGoods[0].price.getText())).eq(proposalPrice, 'Goods price is incorrect')
    })

    it('TestCase 4', async () => {
        // go to 'Services' tab
        await homePage.getNavigationMenuItemByName(TopNavigationItem.Services).click()
        expect(await browser.getTitle()).eq('Заказы на услуги')
        await servicesPage.waitUntilPageIsLoaded()
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
    })

    it('TestCase 5', async () => {
        // go to 'Forum' tab
        await homePage.getNavigationMenuItemByName(TopNavigationItem.Forum).click()
        expect(await browser.getTitle()).eq('Форум onliner.by - Главная страница')
        await forumPage.waitUntilPageIsLoaded()
        // go to 'new in last 24 h' tab
        await forumPage.newInLast24h.click()
        const pageTitle = await forumLastPostsPage.title.getText()
        expect(pageTitle).match(new RegExp('Новое за 24 часа\\\n\\(найдено \\d+ тем(а|ы)?\\)'))
        // check topics count
        expect(extractTopicsCount(pageTitle)).gte(1, 'Topics count is less than 1')
        // check creation time of the all topics from the last page
        await forumLastPostsPage.navigateToLastPageButton.click()
        await forumLastPostsPage.waitUntilPageIsLoaded()
        const topicsList = await forumLastPostsPage.getTopicsList()
        for (const topicCell of topicsList) {
            expect(await topicCell.timeShiftingOfCreationTime()).lte(24 * 60, 'Creation date is less than last 24h')
        }
    })
})