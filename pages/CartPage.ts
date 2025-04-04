import { expect, Locator, Page } from '@playwright/test'
import { ItemPage } from './ItemPage'

export class CartPage extends ItemPage {
   override readonly page: Page
   readonly deleteItem: Locator
   readonly countItems: Locator
   readonly products: Locator
   readonly picture: Locator
   readonly title: Locator
   readonly priceCart: Locator
   readonly cross: Locator
   readonly samsungGalaxy6: Locator
   readonly priceSamsungGalaxy6: Locator
   readonly totalCart: Locator
   readonly totalSamsungGalaxy6: Locator
   readonly orderModalButton: Locator
   readonly itemsVisibility: Locator

   constructor(page: Page) {
      super(page)
      this.page = page
      this.deleteItem = page.locator('//a[contains(text(),"Delete")]').first()
      this.products = page.locator('text="Products"')
      this.picture = page.locator('text="Pic"')
      this.title = page.locator('text="Title"')
      this.priceCart = page.locator('text="Price"')
      this.cross = page.locator('text="x"')
      this.samsungGalaxy6 = page.getByRole('cell', { name: 'Samsung galaxy s6' }).first()
      this.priceSamsungGalaxy6 = page.locator('text="360"').first()
      this.totalCart = page.locator('text="Total"')
      this.totalSamsungGalaxy6 = page.locator('[class="panel-title"]', { hasText: '360' })
      this.orderModalButton = page.locator('[data-target="#orderModal"]')
      this.itemsVisibility = page.locator('[id="tbodyid"]')
   }

   async checkAddCartThenDeleteFromCart(locator: Locator): Promise<void> {
      await this.addItem()
      await expect(locator).toBeVisible()
      await this.deleteItems()
   }

   async addItem(): Promise<void> {
      await this.addCart.click()
      await this.page.goto('https://www.demoblaze.com/cart.html#')
   }

   async deleteItems(): Promise<void> {
      await this.deleteItem.click()
      await this.page.waitForTimeout(2000)
   }
}
