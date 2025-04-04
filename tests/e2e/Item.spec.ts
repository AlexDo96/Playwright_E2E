import { test } from '@playwright/test'
import { ItemPage } from '../../pages/ItemPage'
import { Titles, MoreInformation, Price } from '../../common/AppData'

let itemPage: ItemPage

test.beforeEach(async ({ page }) => {
   itemPage = new ItemPage(page)
   await page.goto('https://www.demoblaze.com/index.html')
})

test.describe('Default Item Page', async () => {
   let samsungGalaxy6ItemURL: string = 'https://www.demoblaze.com/prod.html?idp_=1'
   let sonyXperiaZ5ItemURL: string = 'https://www.demoblaze.com/prod.html?idp_=6'

   test('TC01: Click On The Samsung Galaxy S6 Card -> The Samsung Galaxy S6 Card Opens, The Data Is Correct', async () => {
      await itemPage.samsungGalaxy6Item.click()
      await itemPage.checkItem(samsungGalaxy6ItemURL, Titles.samsungGalaxy6, Price.samsungGalaxy6, MoreInformation.samsungGalaxy6, itemPage.imageSamsungGalaxy6)
   })

   test('TC02: Click On The Sony Xperia Z5 Card -> The Sony Xperia Z5 Card Opens, The Data Is Correct', async () => {
      await itemPage.sonyXperiaZ5Item.click()
      await itemPage.checkItem(sonyXperiaZ5ItemURL, Titles.sonyXperiaZ5, Price.sonyXperiaZ5, MoreInformation.sonyXperiaZ5, itemPage.imageSonyXperiaZ5)
   })
})

test.describe('Next Item Page', async () => {
   let macBookAirItemURL: string = 'https://www.demoblaze.com/prod.html?idp_=11'
   let macBookProItemURL: string = 'https://www.demoblaze.com/prod.html?idp_=15'

   test.beforeEach(async () => {
      await itemPage.clickNextButtonOfPagination()
   })
   
   test('TC01: Click On The MacBook Air Card -> The MacBook Air Opens, The Data Is Correct', async () => {
      await itemPage.macBookAirItem.click()
      await itemPage.checkItem(macBookAirItemURL, Titles.macBookAir, Price.macBookAir, MoreInformation.macBookAir, itemPage.imageMacBook)
   })

   test('TC02: Click On The MacBook Pro Card -> The MacBook Pro Opens, The Data Is Correct', async () => {
      await itemPage.macBookProItem.click()
      await itemPage.checkItem(macBookProItemURL, Titles.macBookPro, Price.macBookPro, MoreInformation.macBookPro, itemPage.imageMacBook)
   })
})
