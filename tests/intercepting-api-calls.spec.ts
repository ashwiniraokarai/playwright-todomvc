import { test } from "@playwright/test"
import importedArticlesObject from "./test-data/articles";
import importedRandomDataArticlesObject from "./test-data/articles-with-randomized-data";
import importedRandomDataArticlesConciseObject from "./test-data/articles-with-randomized-data-concised";
import importedJSONFileParserObject from "./test-data/JSONFileParser";

const conduitURL = "https://demo.realworld.io/#/";
const endPointToIntercept = "https://conduit.productionready.io/api/articles?limit=10&offset=0";

test("can intercept and modify response with your own test data (dummy/ mock data)", 
    async({page}) => {
        await page.route(endPointToIntercept, 
            async (route) => {
                console.log(`Intercepting route: ${endPointToIntercept} and responding with dummy response body`);
                console.log(importedArticlesObject.articlesData());
                await route.fulfill({
                    //convert the JS Object that contains the test data to JSON
                    body: JSON.stringify(importedArticlesObject.articlesData()),
                });
            }
        );

        //call the UI url to trigger the api behind the scenes
        console.log(`Visting page: ${conduitURL}`);
        await page.goto(conduitURL);
    }
);

test("can intercept and modify response data (via path), with data extracted from a json file", 
    async({page}) => {
        await page.route(endPointToIntercept,
            async(route, request) => {
                console.log(`Intercepting route ${request.url()} and responding with dummy data from json file`);
                await route.fulfill({
                    path:"./tests/test-data/articles.json"
                });
            }
        )

        console.log(`Visting page: ${conduitURL}`);
        await page.goto(conduitURL);
    }
);

test("can modify response data (via body), with data extracted from json file", 
    async({page}) => {
        const testDataJSONFilePath = "./tests/test-data/articles.json";

        await page.route(endPointToIntercept, async(route, request)=> {
            console.log(`Intercepting route ${request.url()} and responding with dummy data from json file`);
            
            route.fulfill({
                body: JSON.stringify(importedJSONFileParserObject.extractArticlesTestDataFrom(testDataJSONFilePath)),
            })
        })

        console.log(`Visting page: ${conduitURL}`);
        await page.goto(conduitURL);
    }
);


test("can modify response data (via body) with randomized data extracted from json file",
    async({page})=>{
        await page.route(endPointToIntercept, 
            async(route, request) => {
                console.log(`Intercepting route: ${request.url()} and sending dummy response body`);
                
                await route.fulfill({
                    body: JSON.stringify(importedRandomDataArticlesObject.generateArticlesDataFromFaker()),
                })
            }
        )

        console.log(`Visting page: ${conduitURL}`);
        await page.goto(conduitURL);
    }
);


//Incoming data is a JS object that needs to become JSON in the test in order to ship away as api response body
test("can modify json response body with randomized data served from a js object",
    async({page})=>{
        await page.route(endPointToIntercept, 
        //await page.route("https://conduit.productionready.io/api/articles", 
            async(route, request)=>{
                console.log(`Intercepting route: ${request.url()} and sending dummy response body`);
                route.fulfill({
                    body: JSON.stringify(importedRandomDataArticlesConciseObject.generateArticlesDataFromFaker(20))
                })
            }
        )

        console.log(`Visting page: ${conduitURL}`);
        await page.goto(conduitURL);
    }
);
