import { test, expect } from "@playwright/test";


test.beforeEach(
    async({ page })=>{
        await page.goto("https://todomvc.com/examples/emberjs/todomvc/dist/");
    }
)

test("the input box should display a helpful prompt",
    async( { page }) => {
        await expect(page.locator(".new-todo"))
                        .toHaveAttribute("placeholder","What needs to be done?");
        await page.close();
    }
   
);

test("should be able to add a single todo item", 
    async ( { page } ) => {
        const newTodoField = page.locator(".new-todo");
        
        //Instead of the li, you could even target the label inside the li directly which embeds the text, like so:
        //".todo-list label"
        const displayedTodoItems = page.locator(".todo-list li");

        await newTodoField.fill("feed the dog");
        await newTodoField.press("Enter");
        await expect(displayedTodoItems).toHaveCount(1);

        await expect(displayedTodoItems)
                            .toHaveText("feed the dog");                                            
       
        await page.close();
    }

);

test("should be able to add multiple todo items",
    async( {page} ) => {
        const newTodoField = page.locator(".new-todo");
        const displayedTodoItems = page.locator(".todo-list li");

        await newTodoField.fill("feed the dog");
        await newTodoField.press("Enter");

        await newTodoField.fill("snuggle with the cat");
        await newTodoField.press("Enter");

        await expect(displayedTodoItems).toHaveCount(2);
        await expect(displayedTodoItems).toHaveText(["feed the dog", "snuggle with the cat"]);

        await page.close();
    }
);