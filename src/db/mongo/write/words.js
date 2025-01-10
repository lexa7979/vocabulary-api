/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */

/** @import {IDataService} from "../../types" */

const { getWordsCollection, getTranslationsCollection } = require('../lib/connect');

/** @type {IDataService["insertWord"]} @throws */
async function insertWord(wordItem) {
    const { id, classId } = wordItem;
    const words = getWordsCollection();
    if ((await words.countDocuments({ id })) > 0) {
        throw new Error(`insertWord() failed - ID already used (${id})`);
    }
    await words.insertOne({ id, classId });
}

/** @type {IDataService["updateWord"]} @throws */
async function updateWord(wordItem) {
    const { id, classId } = wordItem;
    const words = getWordsCollection();
    if ((await words.countDocuments({ id })) === 0) {
        throw new Error(`updateWord() failed - ID not found (${id})`);
    }
    await words.findOneAndReplace({ id }, { id, classId });
}

/** @type {IDataService["insertWordWithTranslations"]} @throws */
async function insertWordWithTranslations(wordItem) {
    const { translations } = wordItem;
    await insertWord(wordItem);
    if (translations) {
        for (let i = 0; i < translations.length; i++) {
            await insertTranslation(translations[i]);
        }
    }
}

/** @type {IDataService["updateWordWithTranslations"]} @throws */
async function updateWordWithTranslations(wordItem) {
    const { translations } = wordItem;
    await updateWord(wordItem);
    if (translations) {
        for (let i = 0; i < translations.length; i++) {
            await updateTranslation(translations[i]);
        }
    }
}

/** @type {IDataService["insertTranslation"]} @throws */
async function insertTranslation(translationItem) {
    const { id, wordId, flectionId, text_de, text_sv } = translationItem;
    const translations = getTranslationsCollection();
    if ((await translations.countDocuments({ id })) > 0) {
        throw new Error(`insertTranslation() failed - ID already used (${id})`);
    }
    await translations.insertOne({ id, wordId, flectionId, text_de, text_sv });
}

/** @type {IDataService["updateTranslation"]} @throws */
async function updateTranslation(translationItem) {
    const { id, wordId, flectionId, text_de, text_sv } = translationItem;
    const translations = getTranslationsCollection();
    if ((await translations.countDocuments({ id })) === 0) {
        throw new Error(`updateTranslation() failed - ID not found (${id})`);
    }
    await translations.findOneAndReplace({ id }, { id, wordId, flectionId, text_de, text_sv });
}

module.exports = {
    insertWord,
    updateWord,
    insertWordWithTranslations,
    updateWordWithTranslations,
    insertTranslation,
    updateTranslation,
};
