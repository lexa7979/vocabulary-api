/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */

/** @import {Db} from "mongodb" */

const DummyDb = require('../../dummy');
const { insertUser, insertActiveWord } = require('../write/users');
const { insertWordClass, insertFlection } = require('../write/wordClasses');
const { insertWord, insertTranslation } = require('../write/words');
const { getDatabase } = require('./connect');

const COLLECTION_NAMES = ['words', 'translations', 'wordClasses', 'flections', 'users', 'activeWords'];

async function setupCollections() {
    const db = await getDatabase();
    const existingCollections = await _listExistingCollections(db);
    const missingCollections = COLLECTION_NAMES.filter(name => !existingCollections.includes(name));

    for (let i = 0; i < missingCollections.length; i++) {
        await db.createCollection(missingCollections[i]);
    }
}

/** @param {{ confirmed: boolean }} inputBag */
async function removeCollections({ confirmed }) {
    if (!confirmed) {
        throw new Error(`removeCollections() failed - missing confirmation`);
    }

    const db = await getDatabase();
    const existingCollections = await _listExistingCollections(db);

    for (let i = 0; i < COLLECTION_NAMES.length; i++) {
        if (existingCollections.includes(COLLECTION_NAMES[i])) {
            await db.dropCollection(COLLECTION_NAMES[i]);
        }
    }
}

/** @param {{ confirmed: boolean }} inputBag */
async function prefillCollections({ confirmed }) {
    if (!confirmed) {
        throw new Error(`prefillCollections() failed - missing confirmation`);
    }

    const db = await getDatabase();
    const existingCollections = await _listExistingCollections(db);
    const missingCollections = COLLECTION_NAMES.filter(name => !existingCollections.includes(name));
    if (missingCollections.length > 0) {
        throw new Error(`prefillCollections() failed - missing collection(s): ${missingCollections.join(', ')}`);
    }

    const countings = [];
    for (let i = 0; i < COLLECTION_NAMES.length; i++) {
        countings.push(await db.collection(COLLECTION_NAMES[i]).countDocuments());
    }
    if (countings.some(length => length > 0)) {
        throw new Error(`prefillCollections() failed - non-empty collections found`);
    }

    const dummyWords = await DummyDb.listAllWords();
    for (let i = 0; i < dummyWords.length; i++) {
        await insertWord(dummyWords[i]);

        const dummyTranslations = await DummyDb.listAllTranslationsOfWord(dummyWords[i].id);
        for (let k = 0; k < dummyTranslations.length; k++) {
            await insertTranslation(dummyTranslations[k]);
        }
    }

    const dummyWordClasses = await DummyDb.listAllWordClasses();
    for (let i = 0; i < dummyWordClasses.length; i++) {
        await insertWordClass(dummyWordClasses[i]);

        const dummyFlections = await DummyDb.listAllFlectionsOfWordClass(dummyWordClasses[i].id);
        for (let k = 0; k < dummyFlections.length; k++) {
            await insertFlection(dummyFlections[k]);
        }
    }

    const dummyUsers = await DummyDb.listAllUsers();
    for (let i = 0; i < dummyUsers.length; i++) {
        await insertUser(dummyUsers[i]);

        const dummyActiveWords = await DummyDb.listAllActiveWordsOfUser(dummyUsers[i].id);
        for (let k = 0; k < dummyActiveWords.length; k++) {
            await insertActiveWord(dummyActiveWords[k]);
        }
    }
}

/** @param {Db} db */
async function _listExistingCollections(db) {
    const list = await db.listCollections({}, { nameOnly: true }).toArray();
    const existingCollections = list.map(doc => doc.name);
    return existingCollections;
}

module.exports = {
    setupCollections,
    removeCollections,
    prefillCollections,
};
