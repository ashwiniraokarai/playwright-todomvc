import { test } from "@playwright/test"
import defaultObjectExported from "./test-data/articles";

test("can intercept and modify response with your own test data (dummy/ mock data)", 
    async({page}) => {
        let endPointToIntercept = "https://conduit.productionready.io/api/articles?limit=10&offset=0";
        await page.route(endPointToIntercept, 
            async (route) => {
                console.log(`Intercepting route: ${endPointToIntercept} and sending dummy response body`);
                console.log(defaultObjectExported.articlesData());
                await route.fulfill({
                    //convert the JS Object that contains the test data to JSON
                    body: JSON.stringify(defaultObjectExported.articlesData()),
                });
            }
        );

        //call the UI url to trigger the api behind the scenes
        await page.goto("https://demo.realworld.io/#/");
    }
);

test("can intercept and modify response data, with data extracted from a json file", 
    async({page}) => {}
);

test("can abort specific requests", 
    async({page}) => {}
);