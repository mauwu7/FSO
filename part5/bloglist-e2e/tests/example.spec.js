const { test, expect, beforeEach, describe } = require('@playwright/test')
const { before } = require('node:test')


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
      
      await page.getByLabel('Username').fill('admin1234')
      
      await page.getByLabel('Password').fill('123456789')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('admin1234 logged in')).toBeVisible()
    })

    test('fails with wrong credentias', async ({ page }) => {
      await page.getByLabel('Username').fill('algo')
      await page.getByLabel('Password').fill('dskakd')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Error: credenciales invalidas')).toBeVisible()

    })
  })

  describe('When logged in', () => {

    beforeEach( async ({ page }) => {
      await page.getByLabel('Username').fill('admin1234')
      
      await page.getByLabel('Password').fill('123456789')

      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created',async ({ page }) => {
      await page.getByRole('button', {name: 'Show form'}).click()
      
      await page.getByLabel('titulo:').fill('Blog para testear algo')
      await page.getByLabel('autor:').fill('admin1234')
      await page.getByLabel('url:').fill('www.testBlog.com')

      await page.getByRole('button', {name:'Crear'}).click()

      await expect(page.getByText('Blog para testear algo')).toBeVisible()
    })

    describe('when a blog is created', () => {

      beforeEach( async ({ page }) => {

        await page.getByRole('button', {name: 'Show form'}).click()
        await page.getByLabel('titulo:').fill('Blog para testear algo')
        await page.getByLabel('autor:').fill('admin1234')
        await page.getByLabel('url:').fill('www.testBlog.com')
        await page.getByRole('button', {name:'Crear'}).click()

        await page.getByRole('button', {name: 'Mostrar detalles'}).click()
      })

      test('a blog can be liked', async ({ page }) => {


        await page.getByRole('button', {name: 'Like'}).click()


        

      })

    })
  })

})