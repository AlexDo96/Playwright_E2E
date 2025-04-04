import { Locator, Page } from '@playwright/test'
import { AppPage } from '../AppPage'

export class AboutModal extends AppPage {
   override readonly page: Page
   readonly videoModal: Locator
   readonly videoModalLabel: Locator
   readonly crossButton: Locator
   readonly closeButton: Locator
   readonly videoBlock: Locator
   readonly modalVisble: Locator

   constructor(page: Page) {
      super(page)
      this.page = page
      this.videoModal = page.locator('[id="videoModal"]')
      this.videoModalLabel = page.locator('[id="videoModalLabel"]')
      this.crossButton = page.locator('//div[@id="videoModal"]//button[@aria-label="Close"]')
      this.closeButton = page.locator('//div[@id="videoModal"]//button[contains(text(),"Close")]')
      this.videoBlock = page.locator('[id="example-video"]')
      this.modalVisble = page.locator('[class="modal fade"]>>[id="videoModalLabel"]')
   }
}
