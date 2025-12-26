import {expect} from '@playwright/test'
import {test} from '../test-options'

test.beforeEach(async({page, globalsQaURL}, testInfo) => {
    // await page.goto(globalsQaURL) - get varaible via playwright config file
    await page.goto(process.env.URL)
    // get variable via .env file -> install lib npm i dotenv --save-dev --force
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bf-success')

    await successButton.click()

    // const text = await successButton.textContent()
    await successButton.waitFor({state: "attached"})
    const text = await successButton.allTextContents()

    // expect(text).toEqual('Data loaded with AJAX get request.')
    expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout:20000})
})

test.skip('alternative waits', async({page}) => {
    const successButton = page.locator('.bf-success')

    // wait for element
    await page.waitForSelector('.bf-success')

    // wait for particular response
    await page.waitForResponse('http://www.uitestingplayground.com/ajaxdata')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('timeouts', async ({page}) => {
    const successButton = page.locator('.bf-success')
    await successButton.click({timeout: 16000})
})