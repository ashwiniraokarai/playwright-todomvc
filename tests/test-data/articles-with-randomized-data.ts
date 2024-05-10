import { faker } from "@faker-js/faker"

/*
This function returns a JS/TS Object (It's not JSON. Clue: The Keys aren't Strings)
The resulting JS object is intended to be converted to JSON by the caller before use
*/

function generateArticlesDataFromFaker(): Object{
    return {
        articles:[
            {
                slug: faker.lorem.slug(),
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                body: faker.lorem.paragraph(),
                createdAt: faker.date.recent(),
                updatedAt: "2024-01-04T00:52:58.601Z",
                favorited: faker.datatype.boolean(),
                favoritesCount: faker.number.int({max: 999}),
                author: {
                  username: faker.person.fullName(),
                  bio: null,
                  image: faker.image.url(),
                  following: faker.datatype.boolean()
                }
            },
            {
                slug: faker.lorem.slug(),
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                body: faker.lorem.paragraph(),
                createdAt: faker.date.recent(),
                updatedAt: "2024-01-04T00:52:58.601Z",
                favorited: faker.datatype.boolean(),
                favoritesCount: faker.number.int({max: 999}),
                author: {
                  username: faker.person.fullName(),
                  bio: null,
                  image: faker.image.url(),
                  following: faker.datatype.boolean()
                }
            },
            {
                slug: faker.lorem.slug(),
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                body: faker.lorem.paragraph(),
                createdAt: faker.date.recent(),
                updatedAt: "2024-01-04T00:52:58.601Z",
                favorited: faker.datatype.boolean(),
                favoritesCount: faker.number.int({max: 999}),
                author: {
                  username: faker.person.fullName(),
                  bio: null,
                  image: faker.image.url(),
                  following: faker.datatype.boolean()
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
export default {generateArticlesDataFromFaker};