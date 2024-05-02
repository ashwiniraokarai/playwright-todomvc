import { Page } from "@playwright/test"

export class Navigate{
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async toHomePage(){
        //cast to string so the arg type (string | undefined) becomes compatible with the expected type (string)
        await this.page.goto(process.env.URL as string);
    }
}