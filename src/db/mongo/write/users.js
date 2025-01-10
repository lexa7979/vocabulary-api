/** @import {IDataService} from "../../types" */

const { getUsersCollection, getActiveWordsCollection } = require('../lib/connect');

/** @type {IDataService["insertUser"]} @throws */
async function insertUser(userItem) {
    const { id } = userItem;
    const users = getUsersCollection();
    if ((await users.countDocuments({ id })) > 0) {
        throw new Error(`insertUser() failed - ID already used (${id})`);
    }
    await getUsersCollection().insertOne(userItem);
}

/** @type {IDataService["updateUser"]} @throws */
async function updateUser(userItem) {
    const { id } = userItem;
    const users = getUsersCollection();
    if ((await users.countDocuments({ id })) === 0) {
        throw new Error(`updateUser() failed - ID not found (${id})`);
    }
    await users.findOneAndReplace({ id }, userItem);
}

/** @type {IDataService["insertActiveWord"]} @throws */
async function insertActiveWord(activeWordItem) {
    const { id } = activeWordItem;
    const activeWords = getActiveWordsCollection();
    if ((await activeWords.countDocuments({ id })) > 0) {
        throw new Error(`insertActiveWord() failed - ID already used (${id})`);
    }
    await activeWords.insertOne(activeWordItem);
}

/** @type {IDataService["updateActiveWord"]} @throws */
async function updateActiveWord(activeWordItem) {
    const { id } = activeWordItem;
    const activeWords = getActiveWordsCollection();
    if ((await activeWords.countDocuments({ id })) === 0) {
        throw new Error(`updateActiveWord() failed - ID not found (${id})`);
    }
    await activeWords.findOneAndReplace({ id }, activeWordItem);
}

module.exports = {
    insertUser,
    updateUser,
    insertActiveWord,
    updateActiveWord,
};
