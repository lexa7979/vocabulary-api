/** @import {IDataService} from "../../types" */

const { getWordsCollection, getTranslationsCollection } = require('../lib/connect');

/** @type {IDataService["getWord"]} @throws */
async function getWord(wordId) {
    const word = await getWordsCollection().findOne({ id: wordId });
    if (!word) {
        throw new Error(`getWord() failed - invalid ID (${wordId})`);
    }
    return word;
}

/** @type {IDataService["getWordWithTranslations"]} @throws */
async function getWordWithTranslations(wordId) {
    const word = await getWordsCollection().findOne({ id: wordId });
    if (!word) {
        throw new Error(`getWordWithTranslation() failed - invalid ID (${wordId})`);
    }
    const translations = await listAllTranslationsOfWord(wordId);
    return { ...word, translations };
}

/** @type {IDataService["listAllWords"]} */
async function listAllWords(first = 0, offset = 0) {
    const cursor = getWordsCollection().find().skip(offset);
    if (first) {
        cursor.limit(first);
    }
    const words = await cursor.toArray();
    return words;
}

/** @type {IDataService["getTranslation"]} @throws */
async function getTranslation(translationId) {
    const translation = await getTranslationsCollection().findOne({ id: translationId });
    if (!translation) {
        throw new Error(`getTranslation() failed - invalid ID (${translationId})`);
    }
    return translation;
}

/** @type {IDataService["listAllTranslationsOfWord"]} */
async function listAllTranslationsOfWord(wordId, first = 0, offset = 0) {
    const cursor = getTranslationsCollection().find({ wordId }).skip(offset);
    if (first) {
        cursor.limit(first);
    }
    const translations = await cursor.toArray();
    return translations;
}

module.exports = {
    getWord,
    getWordWithTranslations,
    listAllWords,
    getTranslation,
    listAllTranslationsOfWord,
};
