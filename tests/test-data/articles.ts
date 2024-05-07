/*
This function returns a JS/TS Object (It's not JSON. Clue: The Keys aren't Strings)
*/

function articlesData(): Object{
    return {
        articles:[
            {
                slug:"slug-of-the-intercepted-articles-endpoint",
                title: "title of the intercepted articles endpoint",
                description: "description of the intercepted articles endpoint",
                body: "body of the intercepted articles endpoint",
                author: {
                    username: "author: intercepted by ash karai",
                }
            }
        ]
    }
}

/*
 A note about Exports:
 Alternately you could export just the function => aka "named" export like this: export jsonData
 Exporting as a "default" on the other hand, allows me to wrap up the function as an object
 Plus, the importer does not have to worry about the specifics to import. And can look up callable elements using the default exported object
*/
export default {articlesData};