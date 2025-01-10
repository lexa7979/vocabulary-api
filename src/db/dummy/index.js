/* eslint-disable no-empty-function */

const ReadWords = require('./entities/words');
const ReadWordClasses = require('./entities/wordClasses');
const ReadUsers = require('./entities/users');

/** @type {import('../types').IDataService} */
const db = {
    init: async () => {},

    ...ReadWords,
    insertWord: async () => {},
    updateWord: async () => {},
    insertWordWithTranslations: async () => {},
    updateWordWithTranslations: async () => {},
    insertTranslation: async () => {},
    updateTranslation: async () => {},

    ...ReadWordClasses,
    insertWordClass: async () => {},
    updateWordClass: async () => {},
    insertWordClassWithFlections: async () => {},
    updateWordClassWithFlections: async () => {},
    insertFlection: async () => {},
    updateFlection: async () => {},

    ...ReadUsers,
    insertUser: async () => {},
    updateUser: async () => {},
    insertActiveWord: async () => {},
    updateActiveWord: async () => {},
};

module.exports = db;
