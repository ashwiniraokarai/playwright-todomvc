import { Page } from "@playwright/test"

export class TodoList{
    readonly page: Page;

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

    displayedTodoItems(){
        //Instead of the li, you could even target the label inside the li directly which embeds the text, like so:
        //".todo-list label"
        return this.page.locator(".todo-list li");
    }

    displayedTodoItemBasedOnText(todoText: string){
        //Instead of the li, you could even target the label inside the li directly which embeds the text, like so:
        //".todo-list label"
        return this.page.locator(".todo-list li", { hasText: todoText });
    }

    checkBoxBasedOnTodoItem(todoText: string){
       return this.displayedTodoItemBasedOnText(todoText).locator('.toggle');
    }
    
    /*
    ********************************************************************************
    Functions that act on page locators (locators 
    resolve to elements right before they're acted on) 
    ********************************************************************************
    */
    
    async completeTheTodoItem(todoText: string){
        await this.checkBoxBasedOnTodoItem(todoText).check();
    }

}