const { getUUID, findKeyOfUUID } = require('../../utils/dummyData');

module.exports = {
  getActiveWord,
  getFlection,
  getTranslation,
  getUser,
  getWord,
  getWordClass,
  getWordClassWithFlections,
  getWordWithTranslations,
  listAllActiveWordsOfUser,
  listAllFlectionsOfWordClass,
  listAllTranslationsOfWord,
  listAllUsers,
  listAllWordClasses,
  listAllWords,
};

async function getWordClass(id) {
  if (id === getUUID('verb')) {
    return {
      id,
      name_de: 'Verb',
    };
  }
  throw new Error(`Unsupported ID ("${findKeyOfUUID(id)}") in mockup`);
}

async function getWordClassWithFlections(id) {
  if (id === getUUID('verb')) {
    return {
      flections: [
        {
          classId: id,
          id: getUUID('verb-flection1'),
          name_de: 'Infinitiv',
          pos: 0,
        },
        {
          classId: id,
          id: getUUID('verb-flection2'),
          name_de: 'Präsens',
          pos: 1,
        },
        {
          classId: id,
          id: getUUID('verb-flection3'),
          name_de: 'Präteritum',
          pos: 2,
        },
        {
          classId: id,
          id: getUUID('verb-flection4'),
          name_de: 'Perfekt',
          pos: 3,
        },
        {
          classId: id,
          id: getUUID('verb-flection5'),
          name_de: 'Imperativ',
          pos: 4,
        },
      ],
      id,
      name_de: 'Verb',
    };
  }
  throw new Error(`Unsupported ID ("${findKeyOfUUID(id)}") in mockup`);
}

// eslint-disable-next-line no-unused-vars
async function listAllWordClasses(first = 0, offset = 0) {
  if (offset === 0) {
    return [getWordClass(getUUID('verb'))];
  }
  return [];
}

async function getFlection(id) {
  throw new Error(`Unsupported ID ("${findKeyOfUUID(id)}") in mockup`);
}

// eslint-disable-next-line no-unused-vars
async function listAllFlectionsOfWordClass(id, first = 0, offset = 0) {
  throw new Error(`Unsupported ID ("${findKeyOfUUID(id)}") in mockup`);
}

async function getWord(id) {
  throw new Error(`Unsupported ID ("${findKeyOfUUID(id)}") in mockup`);
}

async function getWordWithTranslations(id) {
  throw new Error(`Unsupported ID ("${findKeyOfUUID(id)}") in mockup`);
}

// eslint-disable-next-line no-unused-vars,no-empty-function
async function listAllWords(first = 0, offset = 0) {}

async function getTranslation(id) {
  throw new Error(`Unsupported ID ("${findKeyOfUUID(id)}") in mockup`);
}

// eslint-disable-next-line no-unused-vars
async function listAllTranslationsOfWord(id, first = 0, offset = 0) {
  throw new Error(`Unsupported ID ("${findKeyOfUUID(id)}") in mockup`);
}

async function getUser(id) {
  throw new Error(`Unsupported ID ("${findKeyOfUUID(id)}") in mockup`);
}

// eslint-disable-next-line no-unused-vars,no-empty-function
async function listAllUsers(first = 0, offset = 0) {}

async function getActiveWord(id) {
  throw new Error(`Unsupported ID ("${findKeyOfUUID(id)}") in mockup`);
}

// eslint-disable-next-line no-unused-vars
async function listAllActiveWordsOfUser(id, first = 0, offset = 0) {
  throw new Error(`Unsupported ID ("${findKeyOfUUID(id)}") in mockup`);
}
