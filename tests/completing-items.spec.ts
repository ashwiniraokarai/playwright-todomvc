import { test, expect } from "@playwright/test";

test("should be able to complete a single todo item from multiple todo items",
    async( {page} ) => {
        const newTodoField = page.locator(".new-todo");
        const displayedTodoItems = page.locator(".todo-list li");
        const itemToComplete = page.locator(".todo-list li", { hasText: "feed the dog"});

        await page.goto("https://todomvc.com/examples/emberjs/todomvc/dist/");

        //add two items so you can complete one of them after
        await newTodoField.fill("feed the dog");
        await newTodoField.press("Enter");

        await newTodoField.fill("snuggle with the cat");
        await newTodoField.press("Enter");

        await expect(displayedTodoItems).toHaveCount(2);
        await expect(displayedTodoItems).toHaveText(["feed the dog", "snuggle with the cat"]);
        
        //complete an item and validate
        await itemToComplete.locator(".toggle").check();
        
        //await expect(itemToComplete).toHaveClass("completed ");
        await expect(itemToComplete).toHaveClass(/completed/);

        page.close();
    }
);