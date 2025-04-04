import { expect, test } from '@playwright/test'
import { DataString, Colors, ModalVisibility } from '../../common/AppData'
import { ContactModal } from '../../pages/modals/ContactModal'

let contactModal: ContactModal

test.beforeEach(async ({ page }) => {
   contactModal = new ContactModal(page)
   await contactModal.page.goto('https://www.demoblaze.com/index.html')
   await contactModal.contactButtonHeader.click()
})

test.describe('General Tests For Contact Modal Window', async () => {
   test('TC01: When I CLick Contact - Modal Window Will Open', async () => {
      await expect(contactModal.exampleModal).toHaveAttribute('class', ModalVisibility.ModalFadeShow)
   })

   test('TC02: Verify Contact Modal Window Elements - Displayed Correctly', async () => {
      await expect(contactModal.modalTitle).toBeVisible()
      await expect(contactModal.modalTitle).toContainText(DataString.Title)
      await expect(contactModal.crossButtonContact).toBeVisible()
      await expect(contactModal.emailField).toBeVisible()
      await expect(contactModal.emailField).toBeEditable()
      await expect(contactModal.nameField).toBeVisible()
      await expect(contactModal.nameField).toBeEditable()
      await expect(contactModal.messageField).toBeVisible()
      await expect(contactModal.messageField).toBeEditable()
      await expect(contactModal.closeButtonContact).toBeVisible()
      await expect(contactModal.closeButtonContact).toBeVisible()
      await expect(contactModal.closeButtonContact).toHaveCSS('color', Colors.Onyx)
      await expect(contactModal.closeButtonContact).toHaveCSS('background-color', Colors.White)
      await expect(contactModal.sendMessageButton).toBeVisible()
      await expect(contactModal.sendMessageButton).toHaveCSS('color', Colors.White)
      await expect(contactModal.sendMessageButton).toHaveCSS('background-color', Colors.DarkBlue)
   })

   test('TC03: When I CLick Send Message Button, Fields Are Not Filled In -> The Contact Modal Window Closes, The Message Is Sent', async () => {
      await contactModal.sendMessageButton.click()
      await contactModal.loadPage()
      await expect(contactModal.exampleModal).toHaveAttribute('class', ModalVisibility.ModalFade)
   })

   test('TC04: When I CLick Send Message Button, Fields Are Filled In -> The Contact Modal Window Closes, The Message Is Sent', async () => {
      await contactModal.emailField.fill(DataString.Email)
      await contactModal.nameField.fill(DataString.Name)
      await contactModal.messageField.fill(DataString.Message)
      await contactModal.sendMessageButton.click()
      await contactModal.loadPage()
      await expect(contactModal.exampleModal).toHaveAttribute('class', ModalVisibility.ModalFade)
   })

   test('TC05: When I CLick On The Cross Button - Modal Window Will Close', async () => {
      await contactModal.crossButtonContact.click()
      await contactModal.loadPage()
      await expect(contactModal.exampleModal).toHaveAttribute('class', ModalVisibility.ModalFade)
   })

   test('TC06: When I CLick On The Close Button - Modal Window Will Close', async () => {
      await contactModal.closeButtonContact.click()
      await contactModal.loadPage()
      await expect(contactModal.exampleModal).toHaveAttribute('class', ModalVisibility.ModalFade)
   })
})
