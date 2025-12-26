import { Locator, Page } from "@playwright/test"
import { CommonActions } from "./commonActions"

export class NavigationPage extends CommonActions{

    readonly page: Page
    readonly formLayoutsMenuIte: Locator
    readonly datePickerMenuIte: Locator
    readonly smartTableMenuItem: Locator
    readonly toastMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor (page: Page) {
        super(page)
        this.page = page
        this.formLayoutsMenuIte = page.getByText('Form Layouts')
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutsMenuIte.click()
        await this.waitForNumberOfSeconds(2)
    }

    async datepickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage(){
        await this.page.getByText('Tables & Data').click()
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage(){
        await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage(){
        await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false")
            await groupMenuItem.click()
    }
}