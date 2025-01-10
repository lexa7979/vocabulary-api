/** @import * as Types from "../../types" */

const { allWords, allTranslations } = require('./words.storage');

/**
 * @param {Types.UUID} wordId
 * @throws
 * @returns {Promise<Types.IWord>}
 */
async function getWord(wordId) {
    const word = allWords.filter(item => item.id === wordId)[0];
    if (word == null) {
        throw new Error(`getWord() failed - invalid ID (${wordId})`);
    }
    return word;
}

/**
 * @param {Types.UUID} wordId
 * @throws
 * @returns {Promise<Types.IWord>}
 */
async function getWordWithTranslations(wordId) {
    const word = allWords.filter(item => item.id === wordId)[0];
    if (word == null) {
        throw new Error(`getWordWithTranslation() failed - invalid ID (${wordId})`);
    }
    const translations = await listAllTranslationsOfWord(wordId);
    return { ...word, translations };
}

/**
 * @param {number} [first]
 * @param {number} [offset]
 * @returns {Promise<Types.IWord[]>}
 */
async function listAllWords(first = 0, offset = 0) {
    const results = allWords.slice(offset, first ? offset + first : undefined);
    return results;
}

/**
 * @param {Types.UUID} translationId
 * @throws
 * @returns {Promise<Types.ITranslation>}
 */
async function getTranslation(translationId) {
    const translation = allTranslations.filter(item => item.id === translationId)[0];
    if (translation == null) {
        throw new Error(`getTranslation() failed - invalid ID (${translationId})`);
    }
    return { ...translation };
}

/**
 * @param {Types.UUID} wordId
 * @param {number} [first]
 * @param {number} [offset]
 * @returns {Promise<Types.ITranslation[]>}
 */
async function listAllTranslationsOfWord(wordId, first = 0, offset = 0) {
    const list = allTranslations.filter(item => item.wordId === wordId);

    const results = list.slice(offset, first ? offset + first : undefined);
    return results;
}

module.exports = {
    getWord,
    getWordWithTranslations,

    listAllWords,

    getTranslation,
    listAllTranslationsOfWord,
};
