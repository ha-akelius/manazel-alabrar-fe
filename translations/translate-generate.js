const fs = require("fs");

const addInterface = (translationKey, translationValue) => {
  const results = extractParams(translationValue);

  if (results?.length) {
    console.log("yes");
    console.log("===================================");
    let interfaceDef = `export interface ${createInterfaceName(translationKey)} {`;
    console.log(interfaceDef);
    results.forEach((key) => (interfaceDef += `${key}: string;`));
    interfaceDef += "};";
    return interfaceDef;
  } else {
    return "";
  }
};

const addProp = (obj, line) => {
  const propNames = line.split(".");

  let currentObj = obj;

  propNames.forEach((propName, index) => {
    if (index < propNames.length - 1) {
      // Create the nested objects if they don't exist yet
      if (!currentObj[propName]) {
        currentObj[propName] = {};
      }
      currentObj = currentObj[propName];
    } else {
      // Set the value of the last property
      currentObj[propName] = line;
    }
  });
};

fs.readFile("translations.csv", "utf-8", (err, data) => {
  const lines = data
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => line.split(","));
  const languages = lines.shift();
  languages.shift();

  var translationsKeys = {};
  var translationsKeysInterfaces = "";
  const translationsMap = {};
  for (const language of languages) {
    translationsMap[language] = {};
  }
  for (const line of lines) {
    addProp(translationsKeys, line[0]);
    translationsKeysInterfaces += addInterface(line[0], line[1]);
    for (let index = 0; index < languages.length; index++) {
      const key = line[0];
      translationsMap[languages[index]][key] = line[index + 1];
    }
  }

  generateTranslationsTs(translationsKeys, translationsKeysInterfaces);

  Object.keys(translationsMap).forEach((key) => {
    console.log("-----------------------------");
    console.log(key);
    console.log("-----------------------------");
    fs.writeFile(`../projects/lms/src/assets/i18n/${key}.json`, JSON.stringify(translationsMap[key]), (err) => {
      if (err) throw err;
      console.log(`gen/${key}.json has been saved!`);
    });
  });
});

function createInterfaceName(translationKey) {
  const regex = /(^|\.|_\s*)([a-z])/g;

  return (
    translationKey
      .replace(regex, (match, group1, group2) => {
        return group1 + group2.toUpperCase();
      })
      .replace(/\.|_/g, "") + "TransParams"
  );
}

function extractParams(translationValue) {
  const regex = /{{([^{}]+)}}/g;
  const matches = [...translationValue.matchAll(regex)];

  const results = matches.map((match) => match[1]);
  return results;
}

async function generateTranslationsTs(translationsKeys, interfaces) {
  const fileContent = `export const translationKeys =  ${JSON.stringify(translationsKeys)}; ${interfaces ?? ""}`;
  fs.writeFile(`../src/app/core/models/translations.ts`, fileContent, (err) => {
    if (err) throw err;
    console.log(`gen/translations.json has been saved!`);
  });
}
