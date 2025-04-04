import { test, expect } from '@playwright/test'
import { ModalVisibility } from '../../common/AppData'
import { PlaceOrderModal } from '../../pages/modals/PlaceOrderModal'

let placeOrderModal: PlaceOrderModal

test.beforeEach(async ({ page }) => {
   placeOrderModal = new PlaceOrderModal(page)
})

test.describe('General Tests For Place Order Modal Window', async () => {
   test('TC01: Modal Window Elements With Product -> Modal Opens, All Elements Are Displayed Correctly', async () => {
      await placeOrderModal.page.goto('https://www.demoblaze.com/index.html')
      await placeOrderModal.samsungGalaxy6Item.click()
      await placeOrderModal.addItem()
      await placeOrderModal.orderModalButton.click()
      await placeOrderModal.checkModal('Total: 360')
      await placeOrderModal.crossButton.click()
      await placeOrderModal.deleteItems()
   })

   test('TC02: Modal Window Elements Without Product -> Modal opens, Total==0, All Elements Are Displayed Correctly', async () => {
      await placeOrderModal.page.goto('https://www.demoblaze.com/cart.html#')
      await placeOrderModal.orderModalButton.click()
      await placeOrderModal.checkModal('Total:')
      await placeOrderModal.crossButton.click()
   })

   test('TC03: Close Modal Window With Close Button, Without Product -> Modal Closes', async () => {
      await placeOrderModal.page.goto('https://www.demoblaze.com/cart.html#')
      await placeOrderModal.orderModalButton.click()
      await placeOrderModal.closeButton.click()
      await expect(placeOrderModal.orderModal).toHaveAttribute('class', ModalVisibility.ModalFade)
   })

   test('TC04: Click On The Purchase Button, Fields Are Not Filled, No Product -> Modal Does Not Close', async () => {
      await placeOrderModal.page.goto('https://www.demoblaze.com/cart.html#')
      await placeOrderModal.orderModalButton.click()
      await placeOrderModal.purchaseButton.click()
      await expect(placeOrderModal.orderModal).not.toHaveAttribute('class', ModalVisibility.ModalFade)
   })

   test('TC05: Click On The Purchase Button, Fields Are Filled From Name To City, With The Product -> Modal Does Not Close. The Purchase Is Not Completed', async () => {
      await placeOrderModal.page.goto('https://www.demoblaze.com/index.html')
      await placeOrderModal.samsungGalaxy6Item.click()
      await placeOrderModal.addItem()
      await placeOrderModal.orderModalButton.click()
      await placeOrderModal.nameField.fill('Zod')
      await placeOrderModal.countryField.fill('Monco')
      await placeOrderModal.cityField.fill('Raketa')
      await placeOrderModal.purchaseButton.click()
      await expect(placeOrderModal.orderModal).not.toHaveAttribute('class', ModalVisibility.ModalFade)
      await placeOrderModal.closeButton.click()
      await placeOrderModal.deleteItems()
   })

   test('TC06: Click On The Purchase Button, The Fields Are Filled From Credit Card To Year, With The Product -> Modal Does Not Close. The Purchase Is Not Made', async () => {
      await placeOrderModal.page.goto('https://www.demoblaze.com/index.html')
      await placeOrderModal.samsungGalaxy6Item.click()
      await placeOrderModal.addItem()
      await placeOrderModal.orderModalButton.click()
      await placeOrderModal.creditCardField.fill('1232564789532154')
      await placeOrderModal.monthField.fill('April')
      await placeOrderModal.yearTitle.fill('2025')
      await placeOrderModal.purchaseButton.click()
      await expect(placeOrderModal.orderModal).not.toHaveAttribute('class', ModalVisibility.ModalFade)
      await placeOrderModal.closeButton.click()
      await placeOrderModal.deleteItems()
   })

   test('TC07: Click On The Purchase Button, Fields Are Filled In, Do Not Click The OK Button, With The Product -> An Alert Is Displayed About A Successful Purchase With Correct Data', async () => {
      await placeOrderModal.page.goto('https://www.demoblaze.com/index.html')
      await placeOrderModal.samsungGalaxy6Item.click()
      await placeOrderModal.addItem()
      await placeOrderModal.orderModalButton.click()
      await placeOrderModal.nameField.fill('Anh')
      await placeOrderModal.countryField.fill('VietNam')
      await placeOrderModal.cityField.fill('HoChiMinh')
      await placeOrderModal.creditCardField.fill('1232564789532154')
      await placeOrderModal.monthField.fill('April')
      await placeOrderModal.yearField.fill('2025')
      await placeOrderModal.purchaseButton.click()
      await expect(placeOrderModal.alertOfSuccess).toBeVisible()
      await expect(placeOrderModal.alertOfSuccessTitle).toBeVisible()
      await expect(placeOrderModal.information).toBeVisible()
      await expect(placeOrderModal.cardNumber).toBeVisible()
      await expect(placeOrderModal.nameClient).toBeVisible()
   })

   test('TC08: Click On The Purchase Button, Fields Are Filled In, Click On The OK Button, With The Product -> You Are Taken To Home page', async () => {
      await placeOrderModal.page.goto('https://www.demoblaze.com/index.html')
      await placeOrderModal.samsungGalaxy6Item.click()
      await placeOrderModal.addItem()
      await placeOrderModal.orderModalButton.click()
      await placeOrderModal.nameField.fill('Anh')
      await placeOrderModal.countryField.fill('VietNam')
      await placeOrderModal.cityField.fill('HoChiMinh')
      await placeOrderModal.creditCardField.fill('1232564789532154')
      await placeOrderModal.monthField.fill('April')
      await placeOrderModal.yearField.fill('2025')
      await placeOrderModal.purchaseButton.click()
      await placeOrderModal.confirmButton.click()
      await expect(placeOrderModal.page).toHaveURL('https://www.demoblaze.com/index.html')
   })
})
