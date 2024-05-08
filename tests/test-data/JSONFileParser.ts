import fs from "fs";

function extractArticlesTestDataFrom(testDataJSONFilePath): Object {
    const testDataJSONString = fs.readFileSync(testDataJSONFilePath, "utf8");
    return JSON.parse(testDataJSONString);
}

export default {extractArticlesTestDataFrom};