import { Page } from "@playwright/test"

export class TodoList{
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

    countOfRemainingToDos(){
        return this.page.locator(".todo-count");
    }
    
    /*
    ********************************************************************************
    Functions that act on page locators (locators 
    resolve to elements right before they're acted on) 
    ********************************************************************************
    */
}