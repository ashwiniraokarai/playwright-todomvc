import { faker } from "@faker-js/faker"

/*
This function returns a JS/TS Object (It's not JSON. Clue: The Keys aren't Strings) 
The JS Object has an Array of several Article Objects
The resulting JS object is converted to JSON by the caller intercepting-api-calls-spec
*/
function generateArticlesDataFromFaker(numberOfArticles: number) {
    return {
        articles: fetchArrayOfArticleObjects(numberOfArticles)
    }
}

/* This function returns an Array containing several Article objects
*/
function fetchArrayOfArticleObjects(numberOfArticles){
  let articleArray: any[] = [];

  for(let count=0; count<numberOfArticles; count++){
      articleArray.push(articleObject());
  }

  console.log(`Generated ${articleArray.length} articles using faker`);
  return articleArray;
}

/* This function returns an Object that represents a single Article
*/
function articleObject(){
  var createdAtDate;

  return {
    slug: faker.lorem.slug(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    body: faker.lorem.paragraph(),

    //using a function to populate createdAt allows me to repurpose the yielded value for updatedAt property 
    createdAt: createdAtDate = generateCreatedAtDate(),
    updatedAt: createdAtDate,

    /* An alternative to writing an explicit function is to use an inline getter like so. 
    The downside is that the value of updatedAt property appears as [Getter] in console.log instead of revealing the yielded value
    */ 
    //get updatedAt() { return this.createdAt },
    
    favorited: faker.datatype.boolean(),
    favoritesCount: faker.number.int({max: 999}),
    author: {
      username: faker.person.fullName(),
      bio: null,
      image: faker.image.url(),
      following: faker.datatype.boolean()
    }
  }
}

function generateCreatedAtDate(){
  return faker.date.recent();
}

/*
 A note about Exports:
 Alternately you could export just the function => aka "named" export like this: export jsonData
 Exporting as a "default" on the other hand, allows me to wrap up the function as an object
 Plus, the importer does not have to worry about the specifics to import. And can look up callable elements using the default exported object
*/
export default {generateArticlesDataFromFaker};