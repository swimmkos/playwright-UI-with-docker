import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

    test('input fields', async({page}, testInfo) => {
        if(testInfo.retry){
            // do something
        }
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: "email"})

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com')

        // generic assertion
        const input = await usingTheGridEmailInput.inputValue()
        expect(input).toEqual('test2@test.com1')

        // locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    test.only('radio buttons', async({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'})

        // await usingTheGridForm.getByLabel('Option 1').check({force: true})
        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
        await expect(usingTheGridForm).toHaveScreenshot({maxDiffPixels: 150})
        // expect(radioStatus).toBeTruthy()
        // await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

        // await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
        // expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
        // expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
    
    })

})

test('checkboxes', async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()

        await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})
        await page.getByRole('checkbox', {name: "Hide in click"}).uncheck({force: true})

        const allBoxes = page.getByRole('checkbox')
        for( const box of await allBoxes.all()){
            await box.check({force: true})
            expect(await box.isChecked()).toBeTruthy()
        }
    })

test('list and dropdowns', async({page}) => {
        const dropdownsMenu = page.locator('ng-header nb-select')
        await dropdownsMenu.click()

        page.getByRole('list') // when the list has a UL tag
        page.getByRole('listitem') // when the list has a LI tag

        // const optionListItem = page.getByRole('list').locator('nb-optio')
        const optionList = page.locator('nb-option-list - nb-option')
        await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
        await optionList.filter({hasText: "Cosmic"}).click()
        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 50')

        const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark" : "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50. 89)",
            "Corporate": "rgb(255, 255, 255)"

        }

        await dropdownsMenu.click()
        for(const color in colors){
            await optionList.filter({hasText: color}).click()
            await expect(header).toHaveCSS('background-color', colors[color])
            if(color != "Corporate")
                await dropdownsMenu.click()
        }
    })

test('tooltips', async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()

        const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
        await toolTipCard.getByRole('button', {name: "Top"}).hover()

        page.getByRole('tooltip') // if you have a role tooltip created
        const tooltip = await page.locator('nb-tooltip').textContent()
        expect(tooltip).toEqual('This is a tooltip')
    })

test('dialog box', async({page}) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        page.on('dialog', dialog => {
            expect(dialog.message).toEqual('Are sure you want delete?')
            dialog.accept()
        })

        await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('nb-trash').click()
        await expect(page.locator('table tr').first()).not.toHaveText("mdo@gmail.com")
    })