import { expect, test } from '@playwright/test'
import { VerificationStyle, VerificationText, Credentials, ErrorsText, Colors } from '../../common/AppData'
import { LoginPage } from '../../pages/LoginPage'

test.use({ storageState: { cookies: [], origins: [] } })

let loginPage: LoginPage

test.beforeEach(async ({ page }) => {
   loginPage = new LoginPage(page)
   await page.goto('https://www.demoblaze.com/index.html')
   await loginPage.loginInModal.click()
})

test.describe('General Login Page Tests', async () => {
   test('TC01: Modal Window Elements -> Displayed Correctly', async () => {
      await expect(loginPage.modalWindow).toBeVisible()
      await expect(loginPage.modalWindow).toHaveAttribute(VerificationStyle.Style, VerificationStyle.DisplayBlock)
      await expect(loginPage.modalWindow).toHaveAttribute(VerificationStyle.Class, VerificationStyle.ModalFadeShow)
      await expect(loginPage.closeModalCross).toBeVisible()
      await expect(loginPage.loginInModalLabel).toBeVisible()
      await expect(loginPage.loginInModalLabel).toContainText(VerificationText.LogIn)
      await expect(loginPage.loginUsernameField).toBeVisible()
      await expect(loginPage.loginUsernameField).toBeEditable()
      await expect(loginPage.loginPasswordField).toBeVisible()
      await expect(loginPage.loginPasswordField).toBeEditable()
      await expect(loginPage.closeModalButton).toBeVisible()
      await expect(loginPage.closeModalButton).toHaveCSS('color', Colors.Onyx)
      await expect(loginPage.closeModalButton).toHaveCSS('background-color', Colors.White)
      await expect(loginPage.loginButton).toBeVisible()
      await expect(loginPage.loginButton).toHaveCSS('color', Colors.White)
      await expect(loginPage.loginButton).toHaveCSS('background-color', Colors.DarkBlue)
   })

   test('TC02: Enter A Valid Login And Password, Click On The "Log in" Button -> The User Is Logged In', async () => {
      await loginPage.typeAndLogin(Credentials.CorrectUsername, Credentials.CorrectPassword)
      await loginPage.verifyVisibilityUserName(VerificationText.Name)
   })

   test('TC03: Insert A Valid Login And Password, Click On The "Log in" Button -> The User Is Logged In', async () => {
      await loginPage.loginUsernameField.fill(Credentials.CorrectUsername)
      await loginPage.loginPasswordField.fill(Credentials.CorrectPassword)
      await loginPage.loginButton.click()
      await loginPage.verifyVisibilityUserName(VerificationText.Name)
   })

   test('TC04: Enter Invalid Login And Invalid Password, Click On The "Log in" Button -> User Is Not Logged In, Authentication Error', async () => {
      await loginPage.typeAndLogin(Credentials.NotCorrectUsername, Credentials.NotCorrectPassword)
      await loginPage.validationDialog('ErrorsText.UserNotExist')
      await loginPage.verifyNotVisibilityUserName(VerificationText.Name)
   })

   test('TC05: Enter Invalid Login And Valid Password, Click On The "Log in" Button -> User Is Not Logged In, Authentication Error', async () => {
      await loginPage.typeAndLogin(Credentials.NotCorrectUsername, Credentials.CorrectPassword)
      await loginPage.page.waitForTimeout(1000)
      await loginPage.verifyNotVisibilityUserName(VerificationText.Name)
      await loginPage.validationDialog(ErrorsText.UserNotExist)
   })

   test('TC06: Enter Valid Login And Invalid Password, Click On The "Log in" Button -> User Is Not Logged In, Authentication Error', async () => {
      await loginPage.typeAndLogin(Credentials.CorrectUsername, Credentials.NotCorrectPassword)
      await loginPage.page.waitForTimeout(1000)
      await loginPage.verifyNotVisibilityUserName(VerificationText.Name)
      await loginPage.validationDialog(ErrorsText.WrongPassword)
   })

   test('TC07: Leave The Fields Empty, Click The "Log in" Button -> User Is Not Logged In, Validation Error', async () => {
      await loginPage.typeAndLogin(Credentials.EmptyUsername, Credentials.EmptyPassword)
      await loginPage.page.waitForTimeout(1000)
      await loginPage.verifyNotVisibilityUserName(VerificationText.Name)
      await loginPage.validationDialog(ErrorsText.ValidationError)
   })

   test('TC08: Enter Valid Login And Leave Password Field Blank, Click The "Log in" Button -> User Is Not Logged In, Validation Error', async () => {
      await loginPage.typeAndLogin(Credentials.CorrectUsername, Credentials.EmptyPassword)
      await loginPage.page.waitForTimeout(1000)
      await loginPage.verifyNotVisibilityUserName(VerificationText.Name)
      await loginPage.validationDialog(ErrorsText.ValidationError)
   })

   test('TC09: Leave Username Field Blank And Enter Valid Password, Click The "Log in" Button -> User Is Not Logged In, Validation Error', async () => {
      await loginPage.typeAndLogin(Credentials.EmptyUsername, Credentials.CorrectPassword)
      await loginPage.page.waitForTimeout(1000)
      await loginPage.verifyNotVisibilityUserName(VerificationText.Name)
      await loginPage.validationDialog(ErrorsText.ValidationError)
   })

   test('TC10: User Is Logged In, Click The "Log out" Button -> User Is Logged Out', async () => {
      await loginPage.loginUsernameField.fill(Credentials.CorrectUsername)
      await loginPage.loginPasswordField.fill(Credentials.CorrectPassword)
      await loginPage.loginButton.click()
      await loginPage.verifyVisibilityUserName(VerificationText.Name)
      await loginPage.logoutButton.click()
      await loginPage.verifyNotVisibilityUserName(VerificationText.Name)
   })
})

test.describe('Actions With A Modal Window', async () => {
   test('TC01: Click On The Cross -> The Modal Window Closes', async () => {
      await loginPage.closeModalCross.click()
      await expect(loginPage.modalWindow).toHaveAttribute(VerificationStyle.Class, VerificationStyle.ModalFade)
      await expect(loginPage.modalWindow).toHaveAttribute(VerificationStyle.Style, VerificationStyle.DisplayNone)
   })

   test('TC02: Click On The "Close" Button -> The Modal Window Closes', async () => {
      await loginPage.closeModalButton.click()
      await expect(loginPage.modalWindow).toHaveAttribute(VerificationStyle.Class, VerificationStyle.ModalFade)
      await expect(loginPage.modalWindow).toHaveAttribute(VerificationStyle.Style, VerificationStyle.DisplayNone)
   })
})

test.describe('Additional Tests', async () => {
   test('TC01: Login With Valid Data After Authentication Error -> User Logged In', async () => {
      await loginPage.typeAndLogin(Credentials.NotCorrectUsername, Credentials.NotCorrectPassword)
      await loginPage.page.waitForTimeout(1000)
      await loginPage.verifyNotVisibilityUserName(VerificationText.Name)
      await loginPage.validationDialog(ErrorsText.UserNotExist)
      await loginPage.clearUsernameAndPasswordField()
      await loginPage.typeAndLogin(Credentials.CorrectUsername, Credentials.CorrectPassword)
      await loginPage.verifyVisibilityUserName(VerificationText.Name)
   })

   test('TC02: Login With Valid Data After Authorization Error -> User Logged In', async () => {
      await loginPage.typeAndLogin(Credentials.CorrectUsername, Credentials.NotCorrectPassword)
      await loginPage.page.waitForTimeout(1000)
      await loginPage.verifyNotVisibilityUserName(VerificationText.Name)
      await loginPage.validationDialog(ErrorsText.WrongPassword)
      await loginPage.clearUsernameAndPasswordField()
      await loginPage.typeAndLogin(Credentials.CorrectUsername, Credentials.CorrectPassword)
      await loginPage.verifyVisibilityUserName(VerificationText.Name)
   })

   test('TC03: Login With Valid Data After Validation Error -> User Logged In', async () => {
      await loginPage.typeAndLogin(Credentials.EmptyUsername, Credentials.EmptyPassword)
      await loginPage.page.waitForTimeout(1000)
      await loginPage.verifyNotVisibilityUserName(VerificationText.Name)
      await loginPage.validationDialog(ErrorsText.ValidationError)
      await loginPage.typeAndLogin(Credentials.CorrectUsername, Credentials.CorrectPassword)
      await loginPage.verifyVisibilityUserName(VerificationText.Name)
   })
})
