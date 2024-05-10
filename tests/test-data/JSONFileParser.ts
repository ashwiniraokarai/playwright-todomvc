import fs from "fs";

/*Leverage fs object to read contents of JSON file, then parse it to regular JS object
 This process is an overkill for this use-case because the test has to convert the JS object back to JSON
*/
function extractArticlesTestDataFrom(testDataJSONFilePath): Object {
    const testDataJSONString = fs.readFileSync(testDataJSONFilePath, "utf8");
    return JSON.parse(testDataJSONString);
}

export default {extractArticlesTestDataFrom};