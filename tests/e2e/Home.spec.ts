import { expect, test } from '@playwright/test'
import { Headers, Categories, Pagination, Colors } from '../../common/AppData'
import { AppPage } from '../../pages/AppPage'

let appPage: AppPage

test.beforeEach(async ({ page }) => {
   appPage = new AppPage(page)
   await appPage.page.goto('https://www.demoblaze.com/index.html')
})

test.describe('Elements Of Home Page', async () => {
   test('TC01: Header Elements -> Display Correctly', async () => {
      await expect(appPage.titleOfHeader).toBeVisible()
      await expect(appPage.titleOfHeader).toContainText(Headers.PRODUCT_STORE)
      await expect(appPage.titleOfHeader).toHaveCSS('color', Colors.White)
      await expect(appPage.countOfElementsInTitleOfHeader).toHaveCount(1)
      await expect(appPage.navbarHeaderElement).toBeVisible()
      await expect(appPage.homeButtonHeader).toBeVisible()
      await expect(appPage.homeButtonHeader).toContainText(Headers.Home)
      await expect(appPage.homeButtonHeader).toHaveCSS('color', Colors.DarkGrayishBlue)
      await expect(appPage.contactButtonHeader).toBeVisible()
      await expect(appPage.contactButtonHeader).toContainText(Headers.Contact)
      await expect(appPage.contactButtonHeader).toHaveCSS('color', Colors.White)
      await expect(appPage.aboutUsButtonHeader).toBeVisible()
      await expect(appPage.aboutUsButtonHeader).toContainText(Headers.AboutUs)
      await expect(appPage.aboutUsButtonHeader).toHaveCSS('color', Colors.White)
      await expect(appPage.cartButtonHeader).toBeVisible()
      await expect(appPage.cartButtonHeader).toContainText(Headers.Cart)
      await expect(appPage.cartButtonHeader).toHaveCSS('color', Colors.White)
      await expect(appPage.logoutButtonHeader).toBeVisible()
      await expect(appPage.logoutButtonHeader).toContainText(Headers.Logout)
      await expect(appPage.logoutButtonHeader).toHaveCSS('color', Colors.White)
      await expect(appPage.nameUserButtonHeader).toBeVisible()
      await expect(appPage.nameUserButtonHeader).toContainText(Headers.Name)
      await expect(appPage.nameUserButtonHeader).toHaveCSS('color', Colors.White)
   })

   test('TC02: Product Slider Elements -> Display Correctly', async () => {
      await expect(appPage.sliderWindow).toBeVisible()
      await expect(appPage.sliderWindowPreviousButton).toBeVisible()
      await expect(appPage.sliderWindowNextButton).toBeVisible()
      await expect(appPage.firstButtonInSliderWindow).toBeVisible()
      await expect(appPage.secondButtonInSliderWindow).toBeVisible()
      await expect(appPage.thirdButtonInSliderWindow).toBeVisible()
   })

   test('TC03: Category Block Elements -> Display Correctly', async () => {
      await expect(appPage.categoriesTitle).toBeVisible()
      await expect(appPage.categoriesTitle).toContainText(Categories.Categories)
      await expect(appPage.categoriesTitle).toHaveCSS('color', Colors.White)
      await expect(appPage.categoryPhones).toBeVisible()
      await expect(appPage.categoryPhones).toContainText(Categories.Phones)
      await expect(appPage.categoryPhones).toHaveCSS('color', Colors.GraniteGray)
      await expect(appPage.categoryLaptops).toBeVisible()
      await expect(appPage.categoryLaptops).toContainText(Categories.Laptops)
      await expect(appPage.categoryLaptops).toHaveCSS('color', Colors.GraniteGray)
      await expect(appPage.categoryMonitors).toBeVisible()
      await expect(appPage.categoryMonitors).toContainText(Categories.Monitors)
      await expect(appPage.categoryMonitors).toHaveCSS('color', Colors.GraniteGray)
   })

   test('TC04: Pagination Elements -> Display Correctly', async () => {
      await expect(appPage.previousButtonOfPagination).toBeVisible()
      await expect(appPage.previousButtonOfPagination).toContainText(Pagination.Previous)
      await expect(appPage.previousButtonOfPagination).toHaveCSS('color', Colors.DarkBlue)
      await expect(appPage.nextButtonOfPagination).toBeVisible()
      await expect(appPage.nextButtonOfPagination).toContainText(Pagination.Next)
      await expect(appPage.nextButtonOfPagination).toHaveCSS('color', Colors.DarkBlue)
   })
})

test.describe('Slider Actions', async () => {
   test('TC01: Default Slide -> First Slide Is Displayed', async () => {
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.FirstSlide)
   })

   test('TC02: The First Slide Is Displayed, Click On The Next Arrow -> The Second Slide Is Displayed', async () => {
      await appPage.clickSliderWindowNextButton()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.SecondSlide)
   })

   test('TC03: The First Slide Is Displayed, Click On The Previous Arrow -> The Third Slide Is Displayed', async () => {
      await appPage.clickSliderWindowPreviousButton()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.ThirdSlide)
   })

   test('TC04: The First Slide Is Displayed, Click Twice On The Next Arrow -> The Third Slide Is Displayed', async () => {
      await appPage.clickTwiceSliderWindowNextButton()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.ThirdSlide)
   })

   test('TC05: The First Slide Is Displayed, Click Twice On The Previous Arrow -> The Second Slide Is Displayed', async () => {
      await appPage.clickTwiceSliderWindowPreviousButton()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.SecondSlide)
   })
})

test.describe('Pagination', async () => {
   test('TC01: By Default -> 9 Positions Of The First Page Are Displayed', async () => {
      await expect(appPage.numberOfItems).toHaveCount(9)
      await expect(appPage.samsungGalaxy6Item).toBeVisible()
      await expect(appPage.nokiaLumiaItem).toBeVisible()
      await expect(appPage.nexus6Item).toBeVisible()
      await expect(appPage.samsungGalaxy7Item).toBeVisible()
      await expect(appPage.iphone6Item).toBeVisible()
      await expect(appPage.sonyXperiaZ5Item).toBeVisible()
      await expect(appPage.htcOne9Item).toBeVisible()
      await expect(appPage.sonyVaio5Item).toBeVisible()
      await expect(appPage.sonyVaio7Item).toBeVisible()
   })

   test('TC02: Press The Prev.Page Button, First Page -> Stay On The First Page, 9 Positions Are Displayed, Instead Of Samsung Galaxy S6--Apple Monitor', async () => {
      await appPage.clickPreviousButtonOfPagination()
      await expect(appPage.numberOfItems).toHaveCount(9)
      await expect(appPage.nokiaLumiaItem).toBeVisible()
      await expect(appPage.nexus6Item).toBeVisible()
      await expect(appPage.samsungGalaxy7Item).toBeVisible()
      await expect(appPage.iphone6Item).toBeVisible()
      await expect(appPage.sonyXperiaZ5Item).toBeVisible()
      await expect(appPage.htcOne9Item).toBeVisible()
      await expect(appPage.sonyVaio5Item).toBeVisible()
      await expect(appPage.sonyVaio7Item).toBeVisible()
      await expect(appPage.appleMonitorItem).toBeVisible()
   })

   test('TC03: Go To Last Page, First Page -> Go To Last Page, 6 Items Are Displayed', async () => {
      await appPage.clickNextButtonOfPagination()
      await expect(appPage.numberOfItems).toHaveCount(6)
      await expect(appPage.appleMonitorItem).toBeVisible()
      await expect(appPage.macBookAirItem).toBeVisible()
      await expect(appPage.dellI7Item).toBeVisible()
      await expect(appPage.dellInchItem).toBeVisible()
      await expect(appPage.asusFullHDItem).toBeVisible()
      await expect(appPage.macBookProItem).toBeVisible()
   })

   test('TC04: Go To Last Page, First Page -> Go To Last Page, 6 Items Are Displayed', async () => {
      await appPage.clickNextAfterPreviousButtonOfPagination()
      await expect(appPage.numberOfItems).toHaveCount(9)
      await expect(appPage.nokiaLumiaItem).toBeVisible()
      await expect(appPage.nexus6Item).toBeVisible()
      await expect(appPage.samsungGalaxy7Item).toBeVisible()
      await expect(appPage.iphone6Item).toBeVisible()
      await expect(appPage.sonyXperiaZ5Item).toBeVisible()
      await expect(appPage.htcOne9Item).toBeVisible()
      await expect(appPage.sonyVaio5Item).toBeVisible()
      await expect(appPage.sonyVaio7Item).toBeVisible()
      await expect(appPage.appleMonitorItem).toBeVisible()
   })

   test('TC05: Go To Last Page After Moving From The Last To The First -> The Transition To Last Page Is Carried Out, 5 Positions Are Displayed, Apple monitor--not displayed', async () => {
      await appPage.clickNextAfterPreviousThenNextButtonOfPagination()
      await expect(appPage.numberOfItems).toHaveCount(5)
      await expect(appPage.macBookAirItem).toBeVisible()
      await expect(appPage.dellI7Item).toBeVisible()
      await expect(appPage.dellInchItem).toBeVisible()
      await expect(appPage.asusFullHDItem).toBeVisible()
      await expect(appPage.macBookProItem).toBeVisible()
   })
})

test.describe('Sort By Categories', async () => {
   test('TC01: Click On Phones -> Items Are Sorted By Category Phones', async () => {
      await appPage.categoryPhones.click()
      await expect(appPage.numberOfItems).toHaveCount(7)
      await expect(appPage.samsungGalaxy6Item).toBeVisible()
      await expect(appPage.nokiaLumiaItem).toBeVisible()
      await expect(appPage.nexus6Item).toBeVisible()
      await expect(appPage.samsungGalaxy7Item).toBeVisible()
      await expect(appPage.iphone6Item).toBeVisible()
      await expect(appPage.sonyXperiaZ5Item).toBeVisible()
      await expect(appPage.htcOne9Item).toBeVisible()
   })

   test('TC02: Click On Laptops -> Items Are Sorted By Category Laptops', async () => {
      await appPage.categoryLaptops.click()
      await expect(appPage.numberOfItems).toHaveCount(6)
      await expect(appPage.sonyVaio5Item).toBeVisible()
      await expect(appPage.sonyVaio7Item).toBeVisible()
      await expect(appPage.macBookAirItem).toBeVisible()
      await expect(appPage.dellI7Item).toBeVisible()
      await expect(appPage.dellInchItem).toBeVisible()
      await expect(appPage.macBookProItem).toBeVisible()
   })

   test('TC03: Click On Monitors -> Items Are Sorted By Category Monitors', async () => {
      await appPage.categoryMonitors.click()
      await expect(appPage.numberOfItems).toHaveCount(2)
      await expect(appPage.appleMonitorItem).toBeVisible()
      await expect(appPage.asusFullHDItem).toBeVisible()
   })
})
