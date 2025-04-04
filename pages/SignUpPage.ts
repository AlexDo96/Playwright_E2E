import { expect, Locator, Page } from '@playwright/test'

export class SignUpPage {
   readonly page: Page
   readonly modalWindow: Locator
   readonly signUpModal: Locator
   readonly signUpModalLabel: Locator
   readonly closeModalCross: Locator
   readonly signUpUsernameField: Locator
   readonly signUpPasswordField: Locator
   readonly closeModalButton: Locator
   readonly signUpButton: Locator
   readonly nameOfUser: Locator
   readonly modalFade: Locator

   constructor(page: Page) {
      this.page = page
      this.modalWindow = page.locator('[id="signInModal"]')
      this.signUpModal = page.locator('[data-target="#signInModal"]')
      this.signUpModalLabel = page.locator('[id="signInModalLabel"]')
      this.closeModalCross = page.locator('//div[@id="signInModal"]//button[@aria-label="Close"]')
      this.signUpUsernameField = page.locator('[id="sign-username"]')
      this.signUpPasswordField = page.locator('[id="sign-password"]')
      this.closeModalButton = page.locator('//div[@id="signInModal"]//button[contains(text(),"Close")]')
      this.signUpButton = page.locator('[onclick="register()"]')
      this.nameOfUser = page.locator('[id="nameofuser"]')
      this.modalFade = page.locator('[class="modal fade"]')
   }

   async typeUsernameField(username: string) {
      await this.signUpUsernameField.click()
      await this.signUpUsernameField.fill(username)
   }

   async typePasswordField(password: string) {
      await this.signUpPasswordField.click()
      await this.signUpPasswordField.fill(password)
   }

   async validationDialog(ErrorsText: string) {
      this.page.on('dialog', async dialog => {
         expect(dialog.message()).toContain(ErrorsText)
         await dialog.accept()
      })
   }

   async typeAndSignUp(username: string, password: string): Promise<void> {
      await this.typeUsernameField(username)
      await this.typePasswordField(password)
      await this.signUpButton.click()
      await this.page.waitForTimeout(2000)
   }

   async clearUsernameAndPasswordField(): Promise<void> {
      await this.signUpUsernameField.click()
      await this.page.keyboard.press('Control+A')
      await this.page.keyboard.press('Backspace')
      await this.signUpPasswordField.click()
      await this.page.keyboard.press('Control+A')
      await this.page.keyboard.press('Backspace')
   }

   async loadPage(): Promise<void> {
      await this.page.waitForLoadState('load')
      await this.page.waitForLoadState('domcontentloaded')
   }
}
