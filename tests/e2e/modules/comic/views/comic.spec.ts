import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test.describe('UI home', () => {
  test('Homepage UI Test', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('[data-home=title]')).toHaveText('BARREL - PART 1')
    await expect(page.locator('[data-home=img]')).toHaveAttribute('alt', "Don't we all.")
    await expect(page.locator('[data-home=img]')).toHaveAttribute(
      'src',
      'https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg'
    )

    await expect((await page.locator('[data-home=star]').all()).length).toBe(5)

    for (const li of await page.locator('[data-home=star]').all()) {
      await expect(li).toHaveClass('home-section__stars__icon disabled')
    }

    await expect((await page.locator('[data-home=btns]').all()).length).toBe(1)
  })

  test('Navigation and Content Test for Sketch Page (2)', async ({ page }) => {
    await page.goto('/')

    await page.locator('[data-btn=next]').click()

    await expect(page.locator('[data-home=title]')).toHaveText('PETIT TREES (SKETCH)')
    await expect(
      page
        .locator('[data-home=img]')
        .getByAltText(
          "'Petit' being a reference to Le Petit Prince, which I only thought about halfway through the sketch"
        )
    ).toBeTruthy()

    await page.goto('/')

    await expect(page.locator('[data-home=title]')).toHaveText('PETIT TREES (SKETCH)')
  })

  test('Navigation with btn prev', async ({ page }) => {
    await page.goto('/')

    await page.locator('[data-btn=next]').click()

    await expect(page.locator('[data-home=title]')).toHaveText('PETIT TREES (SKETCH)')

    await page.locator('[data-btn=prev]').click()

    await expect(page.locator('[data-home=title]')).toHaveText('BARREL - PART 1')
  })

  test('Rate Test', async ({ page }) => {
    await page.goto('/')

    await page.locator('[data-star=s-4]').click()

    for (let index = 1; index <= 5; index++) {
      await expect(page.locator(`[data-star=s-${index}]`)).toHaveClass(
        `home-section__stars__icon ${index === 5 ? 'disabled' : 'active'}`
      )
    }
  })
})
