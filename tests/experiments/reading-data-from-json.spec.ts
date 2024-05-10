import { test } from "@playwright/test"
import todoItemsData from "../test-data/todo-items.json"


/*
  json data is housed in a different file and read into these tests
  The file contents are exported as an object, then imported into this test file
*/

test("can read the entire root object", 
    async({page})=>{
        console.log(todoItemsData);          
            // {
            //     items: [ { todo: 'feed the dog' }, { todo: 'snuggle with the cat' } ]
            // }
    }
)

test("can read the array inside the root object via the items property", 
    async({page})=>{
        console.log(todoItemsData.items);       
            //[ { todo: 'feed the dog' }, { todo: 'snuggle with the cat' } ]
    }
)


test("can read each of the two objects inside the array", 
    async({page})=>{
        console.log(todoItemsData.items[0]);
            // { todo: 'feed the dog' }

        console.log(todoItemsData.items[1]);
            // { todo: 'snuggle with the cat' }
    }
)

test("can read the strings embedded inside each array item (object) via the todo property", 
    async({page})=>{
        console.log(todoItemsData.items[0].todo);
            //feed the dog

        console.log(todoItemsData.items[1].todo);
            //snuggle with the cat
    }
)