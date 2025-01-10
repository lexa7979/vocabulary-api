/** @import {IDataService} from "../../types" */

const { getWordClassesCollection, getFlectionsCollection } = require('../lib/connect');

/** @type {IDataService["getWordClass"]} @throws */
async function getWordClass(wordClassId) {
    const wordClass = await getWordClassesCollection().findOne({ id: wordClassId });
    if (!wordClass) {
        throw new Error(`getWordClass() failed - invalid ID (${wordClassId})`);
    }
    return wordClass;
}

/** @type {IDataService["getWordClassWithFlections"]} @throws */
async function getWordClassWithFlections(wordClassId) {
    const wordClass = await getWordClassesCollection().findOne({ id: wordClassId });
    if (!wordClass) {
        throw new Error(`getWordClass() failed - invalid ID (${wordClassId})`);
    }
    const flections = await listAllFlectionsOfWordClass(wordClassId);
    return { ...wordClass, flections };
}

/** @type {IDataService["listAllWordClasses"]} */
async function listAllWordClasses(first = 0, offset = 0) {
    const cursor = getWordClassesCollection().find().skip(offset);
    if (first) {
        cursor.limit(first);
    }
    const wordClasses = await cursor.toArray();
    return wordClasses;
}

/** @type {IDataService["getFlection"]} @throws */
async function getFlection(flectionId) {
    const flection = await getFlectionsCollection().findOne({ id: flectionId });
    if (!flection) {
        throw new Error(`getFlection() failed - invalid ID (${flectionId})`);
    }
    return flection;
}

/** @type {IDataService["listAllFlectionsOfWordClass"]} */
async function listAllFlectionsOfWordClass(wordClassId, first = 0, offset = 0) {
    const cursor = getFlectionsCollection().find({ classId: wordClassId }).skip(offset);
    if (first) {
        cursor.limit(first);
    }
    const flections = await cursor.toArray();
    return flections;
}

module.exports = {
    getWordClass,
    getWordClassWithFlections,
    listAllWordClasses,
    getFlection,
    listAllFlectionsOfWordClass,
};
