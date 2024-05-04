import { test } from "@playwright/test"

test("can log all requests and responses via page.on()", 
    async( { page} ) => {
        page.on("request", (request) => {
            console.log("Request: ", request.method(), request.url())
        });

        page.on("response", (response) => {
            console.log("Response: ", response.status(), response.url());
        })

        await page.goto("https://demo.realworld.io/#/");
        await page.close();
    }
)

test("can selectively log api-only requests via page.route()", 
    async ( {page}) => {

        //code to set up api intercepts
        await page.route(/.*\/api\/.*/, 
            async(route, request) => {
                console.log("API Request:", request.method(),request.url());
                await route.continue();
            }
        );
        await page.goto("https://demo.realworld.io/#/");
        await page.close();
    }
);