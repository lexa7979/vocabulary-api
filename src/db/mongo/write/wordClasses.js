/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */

/** @import {IDataService} from "../../types" */

const { getWordClassesCollection, getFlectionsCollection } = require('../lib/connect');

/** @type {IDataService["insertWordClass"]} @throws */
async function insertWordClass(wordClassItem) {
    const { id, name_de } = wordClassItem;
    const wordClasses = getWordClassesCollection();
    if ((await wordClasses.countDocuments({ id })) > 0) {
        throw new Error(`insertWordClass() failed - ID already used (${id})`);
    }
    await wordClasses.insertOne({ id, name_de });
}

/** @type {IDataService["updateWordClass"]} @throws */
async function updateWordClass(wordClassItem) {
    const { id, name_de } = wordClassItem;
    const wordClasses = getWordClassesCollection();
    if ((await wordClasses.countDocuments({ id })) === 0) {
        throw new Error(`updateWordClass() failed - ID not found (${id})`);
    }
    await wordClasses.findOneAndReplace({ id }, { id, name_de });
}

/** @type {IDataService["insertWordClassWithFlections"]} @throws */
async function insertWordClassWithFlections(wordClassItem) {
    const { flections } = wordClassItem;
    await insertWordClass(wordClassItem);
    if (flections) {
        for (let i = 0; i < flections.length; i++) {
            await insertFlection(flections[i]);
        }
    }
}

/** @type {IDataService["updateWordClassWithFlections"]} @throws */
async function updateWordClassWithFlections(wordClassItem) {
    const { flections } = wordClassItem;
    await updateWordClass(wordClassItem);
    if (flections) {
        for (let i = 0; i < flections.length; i++) {
            await updateFlection(flections[i]);
        }
    }
}

/** @type {IDataService["insertFlection"]} @throws */
async function insertFlection(flectionItem) {
    const { id } = flectionItem;
    const flections = getFlectionsCollection();
    if ((await flections.countDocuments({ id })) > 0) {
        throw new Error(`insertFlection() failed - ID already used (${id})`);
    }
    await flections.insertOne(flectionItem);
}

/** @type {IDataService["updateFlection"]} @throws */
async function updateFlection(flectionItem) {
    const { id } = flectionItem;
    const flections = getFlectionsCollection();
    if ((await flections.countDocuments({ id })) === 0) {
        throw new Error(`updateFlection() failed - ID not found (${id})`);
    }
    await flections.findOneAndReplace({ id }, flectionItem);
}

module.exports = {
    insertWordClass,
    updateWordClass,
    insertWordClassWithFlections,
    updateWordClassWithFlections,
    insertFlection,
    updateFlection,
};
