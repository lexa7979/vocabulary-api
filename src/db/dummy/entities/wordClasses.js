/** @import * as Types from "../../types" */

const { allWordClasses, allFlections } = require('./wordClasses.storage');

/**
 * @param {Types.UUID} classId
 * @throws
 * @returns {Promise<Types.IWordClass>}
 */
async function getWordClass(classId) {
    const wordClass = allWordClasses.filter(item => item.id === classId)[0];
    if (wordClass == null) {
        throw new Error(`getWordClass() failed - invalid ID (${classId})`);
    }
    return { ...wordClass };
}

/**
 * @param {Types.UUID} classId
 * @throws
 * @returns {Promise<Types.IWordClass>}
 */
async function getWordClassWithFlections(classId) {
    const wordClass = allWordClasses.filter(item => item.id === classId)[0];
    if (wordClass == null) {
        throw new Error(`getWordClass() failed - invalid ID (${classId})`);
    }
    const flections = await listAllFlectionsOfWordClass(classId);
    return { ...wordClass, flections };
}

/**
 * @param {number} [first]
 * @param {number} [offset]
 * @returns {Promise<Types.IWordClass[]>}
 */
async function listAllWordClasses(first = 0, offset = 0) {
    const list = allWordClasses.slice(offset, first ? offset + first : undefined);
    return list.map(item => ({ ...item }));
}

/**
 * @param {Types.UUID} id
 * @throws
 * @returns {Promise<Types.IFlection>}
 */
async function getFlection(id) {
    const flection = allFlections.filter(item => item.id === id)[0];
    if (flection == null) {
        throw new Error(`getFlection() failed - invalid ID (${id})`);
    }
    return { ...flection };
}

/**
 * @param {Types.UUID} classId
 * @param {number} [first]
 * @param {number} [offset]
 * @returns {Promise<Types.IFlection[]>}
 */
async function listAllFlectionsOfWordClass(classId, first = 0, offset = 0) {
    const list = allFlections.filter(item => item.classId === classId).sort((itemA, itemB) => itemA.pos - itemB.pos);

    const results = list.slice(offset, first ? offset + first : undefined);
    return results;
}

module.exports = {
    getWordClass,
    getWordClassWithFlections,

    listAllWordClasses,

    getFlection,
    listAllFlectionsOfWordClass,
};
