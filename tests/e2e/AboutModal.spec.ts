import { test, expect } from '@playwright/test'
import { AboutData, Colors, ModalVisibility } from '../../common/AppData'
import { AboutModal } from '../../pages/modals/AboutModal'

let aboutModal: AboutModal

test.beforeEach(async ({ page }) => {
   aboutModal = new AboutModal(page)
   await page.goto('https://www.demoblaze.com/index.html')
   await aboutModal.aboutUsButtonHeader.click()
   await aboutModal.loadPage()
})

test.describe('General Tests For About Us Modal Window', async () => {
   test('TC01: When I CLick About Us - Modal Window Will Open', async () => {
      await expect(aboutModal.videoModal).toHaveAttribute('class', ModalVisibility.ModalFadeShow)
   })

   test('TC 02: Verify About Us Modal Window Elements - Displayed Correctly', async () => {
      await expect(aboutModal.videoModalLabel).toBeVisible()
      await expect(aboutModal.videoModalLabel).toHaveText(AboutData.About_Us)
      await expect(aboutModal.crossButton).toBeVisible()
      await expect(aboutModal.videoBlock).toBeVisible()
      await expect(aboutModal.closeButton).toBeVisible()
      await expect(aboutModal.closeButton).toHaveCSS('color', Colors.Onyx)
      await expect(aboutModal.closeButton).toHaveCSS('background-color', Colors.White)
   })

   test('TC 03: When I CLick On The Cross Button - Modal Window Will Close', async () => {
      await aboutModal.crossButton.click()
      await expect(aboutModal.videoModal).toHaveAttribute('class', ModalVisibility.ModalFade)
   })

   test('TC 04: When I CLick On The Close Button - Modal Window Will Close', async () => {
      await aboutModal.closeButton.click()
      await expect(aboutModal.videoModal).toHaveAttribute('class', ModalVisibility.ModalFade)
   })
})
