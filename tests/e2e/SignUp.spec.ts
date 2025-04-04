import { SignUpPage } from './../../pages/SignUpPage';
import { LoginPage } from '../../pages/LoginPage'
import { expect, test } from '@playwright/test'
import { VerificationStyle, VerificationText, Credentials, ErrorsText, Colors } from '../../common/AppData'

test.use({ storageState: { cookies: [], origins: [] } })

let signUpPage: SignUpPage
let loginPage: LoginPage

test.beforeEach(async ({ page }) => {
   signUpPage = new SignUpPage(page)
   loginPage = new LoginPage(page)
   await page.goto('https://www.demoblaze.com/index.html')
   await signUpPage.signUpModal.click()
})

test.describe('General Sign Up Page Tests',  async () => {
   test('TC01: Modal Window Elements -> Displayed Correctly', async () => {
      await expect(signUpPage.modalWindow).toBeVisible()
      await expect(signUpPage.modalWindow).toHaveAttribute(VerificationStyle.Style, VerificationStyle.DisplayBlock)
      await expect(signUpPage.modalWindow).toHaveAttribute(VerificationStyle.Class, VerificationStyle.ModalFadeShow)
      await expect(signUpPage.closeModalCross).toBeVisible()
      await expect(signUpPage.signUpModalLabel).toBeVisible()
      await expect(signUpPage.signUpModalLabel).toContainText(VerificationText.SignUp)
      await expect(signUpPage.signUpUsernameField).toBeVisible()
      await expect(signUpPage.signUpUsernameField).toBeEditable()
      await expect(signUpPage.signUpPasswordField).toBeVisible()
      await expect(signUpPage.signUpPasswordField).toBeEditable()
      await expect(signUpPage.closeModalButton).toBeVisible()
      await expect(signUpPage.closeModalButton).toHaveCSS('color', Colors.Onyx)
      await expect(signUpPage.closeModalButton).toHaveCSS('background-color', Colors.White)
      await expect(signUpPage.signUpButton).toBeVisible()
      await expect(signUpPage.signUpButton).toHaveCSS('color', Colors.White)
      await expect(signUpPage.signUpButton).toHaveCSS('background-color', Colors.DarkBlue)
   })

   test('TC02: Successful Sign Up - Login With New Created Account', async ({ page }) => {
      let randomUsername = 'user_2025_' + Math.floor(Math.random() * 1000)
      let randomPassword = 'pass_2025_' + Math.floor(Math.random() * 1000)
      
      await signUpPage.typeAndSignUp(randomUsername, randomPassword)

      page.on('dialog', async (dialog) => {
         // Check text of alert
         expect(dialog.message()).toBe(VerificationText.SignUpSuccess);
         
         // Click (OK) alert
         await dialog.accept();
      });

      await loginPage.loginInModal.click()
      await loginPage.typeAndLogin(randomUsername, randomPassword)
      await loginPage.verifyVisibilityUserName(randomUsername)
      await loginPage.logOut()
      await loginPage.verifyNotVisibilityUserName(randomUsername)
   })

   test('TC03: Empty Username and Password Fields', async ({ page }) => {
      await signUpPage.typeAndSignUp(Credentials.EmptyUsername, Credentials.EmptyPassword)
      await signUpPage.page.waitForTimeout(1000)

      page.on('dialog', async (dialog) => {
         // Check text of alert
         expect(dialog.message()).toBe(ErrorsText.ValidationError);
         
         // Click (OK) alert
         await dialog.accept();
      });
   })

   test('TC04: Empty Username Field Only', async ({ page }) => {
      await signUpPage.typeAndSignUp(Credentials.EmptyUsername, Credentials.CorrectPassword)
      await signUpPage.page.waitForTimeout(1000)

      page.on('dialog', async (dialog) => {
         // Check text of alert
         expect(dialog.message()).toBe(ErrorsText.ValidationError);
         
         // Click (OK) alert
         await dialog.accept();
      });
   })

   test('TC05: Empty Password Field Only', async ({ page }) => {
      await signUpPage.typeAndSignUp(Credentials.CorrectUsername, Credentials.EmptyPassword)
      await signUpPage.page.waitForTimeout(1000)

      page.on('dialog', async (dialog) => {
         // Check text of alert
         expect(dialog.message()).toBe(ErrorsText.ValidationError);
         
         // Click (OK) alert
         await dialog.accept();
      });
   })
})

test.describe('Actions With A Modal Window', async () => {
   test('TC01: Click On The Cross -> The Modal Window Closes', async () => {
      await signUpPage.closeModalCross.click()
      await expect(signUpPage.modalWindow).toHaveAttribute(VerificationStyle.Class, VerificationStyle.ModalFade)
      await expect(signUpPage.modalWindow).toHaveAttribute(VerificationStyle.Style, VerificationStyle.DisplayNone)
   })

   test('TC02: Click On The "Close" Button -> The Modal Window Closes', async () => {
      await signUpPage.closeModalButton.click()
      await expect(signUpPage.modalWindow).toHaveAttribute(VerificationStyle.Class, VerificationStyle.ModalFade)
      await expect(signUpPage.modalWindow).toHaveAttribute(VerificationStyle.Style, VerificationStyle.DisplayNone)
   })
})

test.describe('Additional Tests', async () => {
   test('TC01: Excessively Long Username or Password', async ({ page }) => {
      let longUsername = 'a'.repeat(257)
      let longPassword = 'b'.repeat(257)
      await signUpPage.typeAndSignUp(longUsername, longPassword)
      await signUpPage.page.waitForTimeout(1000)

      page.on('dialog', async (dialog) => {
         // Check text of alert
         expect(dialog.message()).toBe(ErrorsText.SignUpFail);
         
         // Click (OK) alert
         await dialog.accept();
      });
   })

   test('TC02: SQL Injection Attempt', async ({ page }) => {
      let sqlInjectUsername = "'; DROP TABLE users;--"
      let sqlInjectPassword = "'; DROP TABLE users;--"

      await signUpPage.typeAndSignUp(sqlInjectUsername, sqlInjectPassword)
      await signUpPage.page.waitForTimeout(1000)

      page.on('dialog', async (dialog) => {
         // Check text of alert
         expect(dialog.message()).toBe(ErrorsText.UserAlreadyExist);
         
         // Click (OK) alert
         await dialog.accept();
      });
   })

   test('TC03: XSS Injection Attempt', async ({ page }) => {
      let xssUsername = "<script>alert('xss')</script>"
      let xssPassword = "<script>alert('xss')</script>"

      await signUpPage.typeAndSignUp(xssUsername, xssPassword)
      await signUpPage.page.waitForTimeout(1000)

      page.on('dialog', async (dialog) => {
         // Check text of alert
         expect(dialog.message()).toBe(ErrorsText.UserAlreadyExist);
         
         // Click (OK) alert
         await dialog.accept();
      });
   })
})
