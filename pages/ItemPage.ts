import { expect, Locator, Page } from '@playwright/test'
import { AppPage } from './AppPage'
import { Colors } from '../common/AppData'

type strAndReg = string | RegExp

export class ItemPage extends AppPage {
   override readonly page: Page
   readonly nameItem: Locator
   readonly priceItem: Locator
   readonly moreInformation: Locator
   readonly addCart: Locator
   readonly imageSamsungGalaxy6: Locator
   readonly imageSonyXperiaZ5: Locator
   readonly imageMacBook: Locator

   constructor(page: Page) {
      super(page)
      this.page = page
      this.nameItem = page.locator('[class="name"]')
      this.priceItem = page.locator('[class="price-container"]')
      this.moreInformation = page.locator('[id="more-information"]')
      this.addCart = page.locator('//a[contains(text(),"Add to cart")]')
      this.imageSamsungGalaxy6 = page.locator('[src="imgs/galaxy_s6.jpg"]')
      this.imageSonyXperiaZ5 = page.locator('[src="imgs/xperia_z5.jpg"]')
      this.imageMacBook = page.locator('[src="imgs/macbook_air.jpg"]')
   }

   async checkItem(url: strAndReg, nameCartText: strAndReg, priceText: strAndReg, moreInformationText: strAndReg, locator: Locator): Promise<void> {
      await expect(this.page).toHaveURL(url)
      await expect(this.nameItem).toBeVisible()
      await expect(this.nameItem).toHaveText(nameCartText)
      await expect(this.priceItem).toBeVisible()
      await expect(this.priceItem).toHaveText(priceText)
      await expect(this.moreInformation).toBeVisible()
      await expect(this.moreInformation).toHaveText(moreInformationText)
      await expect(this.addCart).toBeVisible()
      await expect(this.addCart).toHaveCSS('color', Colors.White)
      await expect(this.addCart).toHaveCSS('background-color', Colors.LightGreen)
      await expect(locator).toBeVisible()
   }
}
