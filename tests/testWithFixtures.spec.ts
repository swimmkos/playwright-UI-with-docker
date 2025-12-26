import {test} from '../test-options'
import { PageManager } from '../src/page-objects/pageManager'
import {faker} from '@faker-js/faker'


test('parametrized methods 3', async({pageManager, formLayoutsPage}) => {
   
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(10)}@test.cpm}`

    await pageManager.formLayoutPage().submitUsingGridFormWithCredsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, "Option 1")
    await pageManager.formLayoutPage().submitInLineFormWithCredsAndCheckbox(randomFullName, randomEmail, false)
})