import { test } from "@playwright/test";
import importedRandomDataArticlesConciseObject from "../test-data/articles-with-randomized-data-concised"

/*
Test data is housed in and exported in another file, then imported here
Tests (like these) can call the function to consume the data.
Test data is returned in the form of an Object that you can drill down into (Object -> Array containing Several Article Objects)
Essentially the data is bunch of "Article" objects (like the ones seen on blog pages)
*/

//Not doing anything on the page, so not gonna bother passing page as an arg to the callback function
test("can read from an object serving randomized test data", 
    async() => {
        const generatedDataObject = importedRandomDataArticlesConciseObject.fakerGeneratedArticlesData();
        
        //check return type at the root of the data structure
        console.log(`Return type of data at the root: ${typeof(generatedDataObject)}`);

        //confirm there's an array within the root object
        console.log(`Is there an array inside? ${Array.isArray(generatedDataObject.articles)}`);

        //confirm or get insight into the number of article objects in the array
        console.log(`How many article objects are there in the array? ${generatedDataObject.articles.length}`);

        //see first 5 elements (article objects) in the array
        console.log("List of top 5 articles:", generatedDataObject.articles.slice(0,5));
    }
);