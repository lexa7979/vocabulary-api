const { allWords, allTranslations } = require('./words.storage');

/**
 * @param {import('../types').UUID} wordId
 * @throws
 * @returns {Promise<import('../types').IWord>}
 */
async function getWord(wordId) {
    const word = allWords.filter(item => item.id === wordId)[0];
    if (word == null) {
        throw new Error(`getWord() failed - invalid ID (${wordId})`);
    }
    return word;
}

/**
 * @param {import('../types').UUID} wordId
 * @throws
 * @returns {Promise<import('../types').IWord>}
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
 * @returns {Promise<import('../types').IWord[]>}
 */
async function listAllWords(first = 0, offset = 0) {
    const results = allWords.slice(offset, first ? offset + first : undefined);
    return results;
}

/**
 * @param {import('../types').UUID} translationId
 * @throws
 * @returns {Promise<import('../types').ITranslation>}
 */
async function getTranslation(translationId) {
    const translation = allTranslations.filter(item => item.id === translationId)[0];
    if (translation == null) {
        throw new Error(`getTranslation() failed - invalid ID (${translationId})`);
    }
    return { ...translation };
}

/**
 * @param {import('../types').UUID} wordId
 * @param {number} [first]
 * @param {number} [offset]
 * @returns {Promise<import('../types').ITranslation[]>}
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
