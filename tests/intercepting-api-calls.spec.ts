import { test } from "@playwright/test"
import importedArticlesObject from "./test-data/articles";
import importedRandomDataArticlesObject from "./test-data/articles-with-randomized-data";
import importedJSONFileParserObject from "./test-data/JSONFileParser";

test("can intercept and modify response with your own test data (dummy/ mock data)", 
    async({page}) => {
        let endPointToIntercept = "https://conduit.productionready.io/api/articles?limit=10&offset=0";
        await page.route(endPointToIntercept, 
            async (route) => {
                console.log(`Intercepting route: ${endPointToIntercept} and sending dummy response body`);
                console.log(importedArticlesObject.articlesData());
                await route.fulfill({
                    //convert the JS Object that contains the test data to JSON
                    //body: JSON.stringify(importedArticlesObject.articlesData()),
                    body: JSON.stringify(importedRandomDataArticlesObject.fakerGeneratedArticlesData()),
                });
            }
        );

        //call the UI url to trigger the api behind the scenes
        await page.goto("https://demo.realworld.io/#/");
    }
);

test("can intercept and modify response data (via path), with data extracted from a json file", 
    async({page}) => {
        const endPointToIntercept = "https://conduit.productionready.io/api/articles?limit=10&offset=0";
        await page.route(endPointToIntercept,
            async(route) => {
                await route.fulfill({
                    path:"./tests/test-data/articles.json"
                });
            }
        )
        await page.goto("https://demo.realworld.io/#/");
    }
);

test("can modify response data (via body), with data extracted from json file", 
    async({page}) => {
        const endPointToIntercept = "https://conduit.productionready.io/api/articles?limit=10&offset=0";
        
        await page.route(endPointToIntercept, async(route, request)=> {
            const testDataJSONFilePath = "./tests/test-data/articles.json";
            console.log(`Intercepting route ${request.url()} and responding with dummy data from a file`);
            console.log(importedJSONFileParserObject.extractArticlesTestDataFrom(testDataJSONFilePath))
            route.fulfill({
                body: JSON.stringify(importedJSONFileParserObject.extractArticlesTestDataFrom(testDataJSONFilePath)),
            })
        })

        await page.goto("https://demo.realworld.io/#/");
    }
);


test("can modify responses data (via body) with randomized data extracted from json file",
    async({page})=>{
        const endPointToIntercept = "https://conduit.productionready.io/api/articles?limit=10&offset=0";
        
        await page.route(endPointToIntercept, 
            async(route, request) => {
                console.log(`Intercepting route: ${request.url()} and sending dummy response body`);
                
                await route.fulfill({
                    body: JSON.stringify(importedRandomDataArticlesObject.fakerGeneratedArticlesData()),
                })
            }
        )

        await page.goto("https://demo.realworld.io/#/");
    }
)