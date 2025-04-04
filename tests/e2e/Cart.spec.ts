import { test, expect } from '@playwright/test'
import { CartPage } from '../../pages/CartPage'
import { Colors } from '../../common/AppData'

let cartPage: CartPage

test.beforeEach(async ({ page }) => {
   cartPage = new CartPage(page)
   await page.goto('https://www.demoblaze.com/index.html')
})

test.describe('General Tests for the Cart Page', async () => {
   test('TC01: Verify Cart Page Elements', async () => {
      await cartPage.samsungGalaxy6Item.click()
      await cartPage.addItem()
      await expect(cartPage.itemsVisibility).not.toBeEmpty()
      await expect(cartPage.products).toBeVisible()
      await expect(cartPage.picture).toBeVisible()
      await expect(cartPage.title).toBeVisible()
      await expect(cartPage.samsungGalaxy6).toBeVisible()
      await expect(cartPage.priceCart).toBeVisible()
      await expect(cartPage.priceSamsungGalaxy6).toBeVisible()
      await expect(cartPage.deleteItem).toBeVisible()
      await expect(cartPage.totalCart).toBeVisible()
      await expect(cartPage.totalSamsungGalaxy6).toBeVisible()
      await expect(cartPage.orderModalButton).toBeVisible()
      await expect(cartPage.orderModalButton).toHaveText('Place Order')
      await expect(cartPage.orderModalButton).toHaveCSS('color', Colors.White)
      await expect(cartPage.orderModalButton).toHaveCSS('background-color', Colors.LightGreen)
      await cartPage.deleteItems()
   })

   test('TC02: Verify Page Elements Without Any Item In Cart', async () => {
      await cartPage.page.goto('https://www.demoblaze.com/cart.html#')
      await expect(cartPage.products).toBeVisible()
      await expect(cartPage.picture).toBeVisible()
      await expect(cartPage.title).toBeVisible()
      await expect(cartPage.priceCart).toBeVisible()
      await expect(cartPage.totalCart).toBeVisible()
      await expect(cartPage.itemsVisibility).toBeEmpty()
      await expect(cartPage.orderModalButton).toBeVisible()
      await expect(cartPage.orderModalButton).toHaveText('Place Order')
      await expect(cartPage.orderModalButton).toHaveCSS('color', Colors.White)
      await expect(cartPage.orderModalButton).toHaveCSS('background-color', Colors.LightGreen)
   })
})

test.describe('Adding Product To The Cart Page', async () => {
   test.describe('Adding Product To The Cart Page: Default Page', async () => {
      test('TC01: Add Samsung Galaxy s6 -> Samsung Galaxy s6 Added, Data Correct', async () => {
         await cartPage.samsungGalaxy6Item.click()
         await cartPage.checkAddCartThenDeleteFromCart(cartPage.imageSamsungGalaxy6)
      })

      test('TC02: Add Sony Xperia Z5 -> Sony Xperia Z5 Added, Data Correct', async () => {
         await cartPage.sonyXperiaZ5Item.click()
         await cartPage.checkAddCartThenDeleteFromCart(cartPage.imageSonyXperiaZ5)
      })
   })

   test.describe('Adding Product To The Cart Page: Next Page', async () => {
      test.beforeEach(async () => {
         await cartPage.clickNextButtonOfPagination()
      })

      test('TC01: Add MacBook Air -> MacBook Air Added, Data Correct', async () => {
         await cartPage.macBookAirItem.click()
         await cartPage.checkAddCartThenDeleteFromCart(cartPage.imageMacBook)
      })

      test('TC02: Add MacBook Pro -> MacBook Pro Added, Data Correct', async () => {
         await cartPage.macBookProItem.click()
         await cartPage.checkAddCartThenDeleteFromCart(cartPage.imageMacBook)
      })
   })
})
