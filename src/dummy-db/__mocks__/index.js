/* eslint-disable no-unused-vars */

const { getUUID, findKeyOfUUID } = require('../../utils/dummyData');

/**
 * @param {import('../types').UUID} classId
 * @returns {Promise<import('../types').IWordClass>}
 */
async function getWordClass(classId) {
    if (classId === getUUID('verb')) {
        return { id: classId, name_de: 'Verb' };
    }
    throw new Error(`Unsupported ID ("${findKeyOfUUID(classId)}") in mockup`);
}

/**
 * @param {import('../types').UUID} classId
 * @returns {Promise<import('../types').IWordClass>}
 */
async function getWordClassWithFlections(classId) {
    if (classId === getUUID('verb')) {
        return {
            id: classId,
            name_de: 'Verb',
            flections: [
                { id: getUUID('verb-flection1'), classId, pos: 0, name_de: 'Infinitiv' },
                { id: getUUID('verb-flection2'), classId, pos: 1, name_de: 'Präsens' },
                { id: getUUID('verb-flection3'), classId, pos: 2, name_de: 'Präteritum' },
                { id: getUUID('verb-flection4'), classId, pos: 3, name_de: 'Perfekt' },
                { id: getUUID('verb-flection5'), classId, pos: 4, name_de: 'Imperativ' },
            ],
        };
    }
    throw new Error(`Unsupported ID ("${findKeyOfUUID(classId)}") in mockup`);
}

/**
 * @param {number} [first]
 * @param {number} [offset]
 * @returns {Promise<import('../types').IWordClass[]>}
 */
async function listAllWordClasses(first = 0, offset = 0) {
    if (offset === 0) {
        return Promise.all([getWordClass(getUUID('verb'))]);
    }
    return [];
}

/**
 * @param {import('../types').UUID} flectionId
 * @returns {Promise<import('../types').IFlection>}
 */
async function getFlection(flectionId) {
    throw new Error(`Unsupported ID ("${findKeyOfUUID(flectionId)}") in mockup`);
}

/**
 * @param {import('../types').UUID} classId
 * @param {number} [first]
 * @param {number} [offset]
 * @returns {Promise<import('../types').IFlection[]>}
 */
async function listAllFlectionsOfWordClass(classId, first = 0, offset = 0) {
    throw new Error(`Unsupported ID ("${findKeyOfUUID(classId)}") in mockup`);
}

/**
 * @param {import('../types').UUID} wordId
 * @returns {Promise<import('../types').IWord>}
 */
async function getWord(wordId) {
    throw new Error(`Unsupported ID ("${findKeyOfUUID(wordId)}") in mockup`);
}

/**
 * @param {import('../types').UUID} wordId
 * @returns {Promise<import('../types').IWord>}
 */
async function getWordWithTranslations(wordId) {
    throw new Error(`Unsupported ID ("${findKeyOfUUID(wordId)}") in mockup`);
}

/**
 * @param {number} [first]
 * @param {number} [offset]
 * @returns {Promise<import('../types').IWord[]>}
 */
async function listAllWords(first = 0, offset = 0) {
    throw new Error(`Missing list for mockup`);
}

/**
 * @param {import('../types').UUID} translationId
 * @returns {Promise<import('../types').ITranslation>}
 */
async function getTranslation(translationId) {
    throw new Error(`Unsupported ID ("${findKeyOfUUID(translationId)}") in mockup`);
}

/**
 * @param {import('../types').UUID} wordId
 * @param {number} [first]
 * @param {number} [offset]
 * @returns {Promise<import('../types').ITranslation[]>}
 */
async function listAllTranslationsOfWord(wordId, first = 0, offset = 0) {
    throw new Error(`Unsupported ID ("${findKeyOfUUID(wordId)}") in mockup`);
}

/**
 * @param {import('../types').UUID} userId
 * @returns {Promise<import('../types').IUser>}
 */
async function getUser(userId) {
    throw new Error(`Unsupported ID ("${findKeyOfUUID(userId)}") in mockup`);
}

/**
 * @param {number} [first]
 * @param {number} [offset]
 * @returns {Promise<import('../types').IUser[]>}
 */
async function listAllUsers(first = 0, offset = 0) {
    throw new Error(`Missing list for mockup`);
}

/**
 * @param {import('../types').UUID} activeWordId
 * @returns {Promise<import('../types').IActiveWord>}
 */
async function getActiveWord(activeWordId) {
    throw new Error(`Unsupported ID ("${findKeyOfUUID(activeWordId)}") in mockup`);
}

/**
 * @param {import('../types').UUID} userId
 * @param {number} [first]
 * @param {number} [offset]
 * @returns {Promise<import('../types').IActiveWord[]>}
 */
async function listAllActiveWordsOfUser(userId, first = 0, offset = 0) {
    throw new Error(`Unsupported ID ("${findKeyOfUUID(userId)}") in mockup`);
}

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
