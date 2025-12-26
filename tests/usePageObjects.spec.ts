import { expect, test } from '@playwright/test'
import { NavigationPage } from '../src/page-objects/navigationPage'
import { FromLayoutsPage } from '../src/page-objects/formLayoutsPage'
import { PageManager } from '../src/page-objects/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async({page}) => {
    await page.goto('/')
})

// @smoke - tag
test('navigation to for, page @smoke', async({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
})

test.skip('parametrized methods', async({page}) => {
    const pm = new PageManager(page)

    await pm.navigationPage().formLayoutsPage()
    await pm.formLayoutPage().submitUsingGridFormWithCredsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, "Option 1")
})

test.skip('parametrized methods 2', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FromLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingGridFormWithCredsAndSelectOption("test@test.com", "Welocme", "Option 2")
})

test('parametrized methods 3', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FromLayoutsPage(page)
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(10)}@test.cpm}`


    await navigateTo.formLayoutsPage()
    await page.screenshot({path: 'screenshots/formLayaoutsPage.png'})
    await onFormLayoutsPage.submitInLineFormWithCredsAndCheckbox("randomFullName","test@test.com", true)
    page.locator('nb-card', {hasText: 'Inline form'}).screenshot({path: 'screenshots/inlineForm.png'})
    await navigateTo.formLayoutsPage()
})