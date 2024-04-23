
import { Page } from "@playwright/test"

export class TodoForm {
    page: Page;

    constructor(page: Page){
        this.page = page;
    }

    /*
    ********************************************************************************
    Functions that return page locators. 
    Each function returns a Type called "Locator" which in turn resolves to the elements
    right before performing an action.
    ********************************************************************************
    */
    newToDoField(){
        return this.page.locator(".new-todo");
    }
}