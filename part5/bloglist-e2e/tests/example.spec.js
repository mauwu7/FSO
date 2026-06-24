const { test, expect, beforeEach, describe } = require('@playwright/test')
const { deepStrictEqual } = require('node:assert')


describe('Blog app', () => {

  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'userTest',
        username: 'admin1234',
        password: '123456789'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.getByTestId('form-login')).toBeVisible()
  })

  describe('Login', () => {

    test('success with correct credentials', async ({ page }) => {
      
      
      await page.getByLabel('Username').first().fill('admin1234')
      
      await page.getByLabel('Password').last().fill('123456789')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('admin1234 logged in')).toBeVisible()
    })

    test('fails with wrong credentias', async ({ page }) => {
      await page.getByLabel('Username').first().fill('algo')
      await page.getByLabel('Password').last().fill('dskakd')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Error: credenciales invalidas')).toBeVisible()

    })

  })
})