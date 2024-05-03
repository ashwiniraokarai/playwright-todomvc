import { test, expect, Locator } from "@playwright/test";
import { TodoForm } from "./page-classes/todo-form.ts";
import { TodoList } from "./page-classes/todo-list.ts";
import { Navigate } from "./page-classes/navigate.ts";
import todoItemsTestData from "./test-data/todo-items.json"

let todoForm: TodoForm;
let newTodoField: Locator;

let todoList: TodoList;
let countOfRemainingToDos: Locator;
let displayedTodoItems: Locator;

let navigate: Navigate;

//Extract test data from json files
let todoItems = todoItemsTestData.items;
let todoItemOne = todoItems[0].todo;
let todoItemTwo = todoItems[1].todo;

test.beforeEach(
    async({ page })=>{
        navigate = new Navigate(page);
        await navigate.toHomePage();
       
        //Invoke the page object to grab locator(s)
        todoForm = new TodoForm(page);
        newTodoField = todoForm.newToDoField();

        todoList = new TodoList(page);
        countOfRemainingToDos = todoList.countOfRemainingToDos();
        displayedTodoItems = todoList.displayedTodoItems();
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
                await todoForm.addItem(todoItemOne);
        })

        test("should be shown the newly added item", 
            async ( { page } ) => {
                await expect(displayedTodoItems).toHaveCount(1);
                await expect(displayedTodoItems)
                                    .toHaveText(todoItemOne);   
            }
        );

        test("be shown the count of remaining items", 
            async ( { page } ) => {
                await expect(countOfRemainingToDos)
                                    .toHaveText("1 item left");
            }
       );
    }
);

test.describe("when adding multiple todo items", 
    async()=>{
        test.beforeEach("add multiple todo items",
            async({page}) => {
                await todoForm.addItem(todoItemOne);
                await todoForm.addItem(todoItemTwo);
            }
        )
        test("should be shown all the added items",
            async( {page} ) => {
                await expect(displayedTodoItems).toHaveCount(2);
                await expect(displayedTodoItems).toHaveText([todoItemOne, todoItemTwo]);
            }
        );

        test("should be shown the count of remaining items",
            async( {page} ) => {
                await expect(countOfRemainingToDos)
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

