import { test, expect, Locator } from "@playwright/test";
import { Navigate } from "./page-classes/navigate";
import { TodoForm } from "./page-classes/todo-form";
import { TodoList } from "./page-classes/todo-list";

let navigate: Navigate;

let todoForm: TodoForm;
let newTodoField: Locator;

let todoList: TodoList;
let displayedTodoItems: Locator;
let countOfRemainingTodos: Locator;
let itemToComplete: Locator;

test.beforeEach(
    async({page}) => {
        navigate = new Navigate(page);
        await navigate.toHomePage();
        
        //grab locators into variables from relevant page objects
        todoForm = new TodoForm(page);
        newTodoField = todoForm.newToDoField();

        todoList = new TodoList(page);
        displayedTodoItems = todoList.displayedTodoItems();
        countOfRemainingTodos = todoList.countOfRemainingToDos();
        itemToComplete = todoList.displayedTodoItemBasedOnText("feed the dog");
    }
);

test.describe("when completing a single todo item from multiple todo items",
    async()=>{
        test.beforeEach("add multiple todo items and complete one of them", 
            async({page})=>{

                //add two items so you can complete one of them after
                await todoForm.addItem("feed the dog");
                await todoForm.addItem("snuggle with the cat");

                await expect(displayedTodoItems).toHaveCount(2);
                await expect(displayedTodoItems).toHaveText(["feed the dog", "snuggle with the cat"]);

                //complete the first item
                await todoList.completeTheTodoItem('feed the dog');
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
                await expect(countOfRemainingTodos).toHaveText("1 item left");
            }
        );
    }
);

test.afterEach("close the page", 
    async({page}) => {
        await page.close();
    }
);