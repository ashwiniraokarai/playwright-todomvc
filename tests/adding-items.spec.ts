import { test, expect, Locator } from "@playwright/test";
import { TodoForm } from "./page-classes/todo-form.ts";

let newTodoField: Locator;
let displayedTodoItems: Locator;
let todoForm: TodoForm;

test.beforeEach(
    async({ page })=>{
        await page.goto("https://todomvc.com/examples/emberjs/todomvc/dist/");
       
        //Invoke the page object to grab locator(s)
        todoForm = new TodoForm(page);
        newTodoField = todoForm.newToDoField();

        //Instead of the li, you could even target the label inside the li directly which embeds the text, like so:
        //".todo-list label"
        displayedTodoItems = page.locator(".todo-list li");
    }
)

test("the input box should display a helpful prompt",
    async( { page }) => {
        await expect(newTodoField)
                        .toHaveAttribute("placeholder","What needs to be done?");                
    }
   
);

test.describe("when adding a single todo item", 
    async()=>{
        test.beforeEach("submit a todo item",
            async({page}) => {
                await newTodoField.fill("feed the dog");
                await newTodoField.press("Enter");
        })

        test("should be shown the newly added item", 
            async ( { page } ) => {
                await expect(displayedTodoItems).toHaveCount(1);
                await expect(displayedTodoItems)
                                    .toHaveText("feed the dog");   
            }
        );

        test("be shown the count of remaining items", 
            async ( { page } ) => {
                await expect(page.locator(".todo-count"))
                                    .toHaveText("1 item left");
                await page.close();
            }
       );
    }
);

test.describe("when adding multiple todo items", 
    async()=>{
        test.beforeEach("add multiple todo items",
            async({page}) => {
                await newTodoField.fill("feed the dog");
                await newTodoField.press("Enter");

                await newTodoField.fill("snuggle with the cat");
                await newTodoField.press("Enter");
            }
        )
        test("should be shown all the added items",
            async( {page} ) => {
                await expect(displayedTodoItems).toHaveText(["feed the dog", "snuggle with the cat"]);
            }
        );

        test("should be shown the count of remaining items",
            async( {page} ) => {
                await expect(page.locator(".todo-count"))
                                    .toHaveText("2 items left");
            }
        );
    }
);

test.afterEach("close the page", 
    async({page}) => {
        await page.close();
    }
);

