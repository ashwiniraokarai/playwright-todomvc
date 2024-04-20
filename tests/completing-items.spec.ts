import { test, expect } from "@playwright/test";

let newTodoField;
let displayedTodoItems;

test.beforeEach(
    async({page}) => {
        await page.goto("https://todomvc.com/examples/emberjs/todomvc/dist/");
        newTodoField = page.locator(".new-todo");
        displayedTodoItems = page.locator(".todo-list li");
    }
);

test.describe("when completing a single todo item from multiple todo items",
    async()=>{
        let itemToComplete;

        test.beforeEach("add multiple todo items and complete one of them", 
            async({page})=>{
                //add two items so you can complete one of them after
                await newTodoField.fill("feed the dog");
                await newTodoField.press("Enter");

                await newTodoField.fill("snuggle with the cat");
                await newTodoField.press("Enter");

                await expect(displayedTodoItems).toHaveCount(2);
                await expect(displayedTodoItems).toHaveText(["feed the dog", "snuggle with the cat"]);

                itemToComplete = page.locator(".todo-list li", { hasText: "feed the dog"});
                await itemToComplete.locator(".toggle").check();
            }
        );

        test("the completed item should be shown struck off",
            async({page}) => {
                //validate the completed item
                //await expect(itemToComplete).toHaveClass("completed ");
                await expect(itemToComplete).toHaveClass(/completed/);
            }
        );

        test("should be shown the updated count of remaining items",
            async( {page} ) => {
                await expect(page.locator(".todo-count")).toHaveText("1 item left");
            }
        );
    }
);

test.afterEach("close the page", 
    async({page}) => {
        await page.close();
    }
);