import { Page } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { FromLayoutsPage } from "./formLayoutsPage";

export class PageManager{

    private readonly page: Page
    private readonly navigatioPage: NavigationPage
    private readonly formLayoutsPage: FromLayoutsPage

    constructor(page: Page) {
        this.page = page
        this.navigatioPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FromLayoutsPage(this.page)
    }

    navigationPage() {
        return this.navigatioPage
    }

    formLayoutPage() {
        return this.formLayoutsPage
    }
}