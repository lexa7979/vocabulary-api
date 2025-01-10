/** @import {IDataService} from "../../types" */

const { getUsersCollection, getActiveWordsCollection } = require('../lib/connect');

/** @type {IDataService["getUser"]} @throws */
async function getUser(userId) {
    const item = await getUsersCollection().findOne({ id: userId });
    if (!item) {
        throw new Error(`getUser() failed - invalid ID (${userId})`);
    }
    return item;
}

/** @type {IDataService["listAllUsers"]} */
async function listAllUsers(first = 0, offset = 0) {
    const cursor = getUsersCollection().find().skip(offset);
    if (first) {
        cursor.limit(first);
    }
    const items = await cursor.toArray();
    return items;
}

/** @type {IDataService["getActiveWord"]} @throws */
async function getActiveWord(activeWordId) {
    const item = await getActiveWordsCollection().findOne({ id: activeWordId });
    if (!item) {
        throw new Error(`getActiveWord() failed - invalid ID (${activeWordId})`);
    }
    return item;
}

/** @type {IDataService["listAllActiveWordsOfUser"]} */
async function listAllActiveWordsOfUser(userId, first = 0, offset = 0) {
    const cursor = getActiveWordsCollection().find({ userId }).skip(offset);
    if (first) {
        cursor.limit(first);
    }
    const items = await cursor.toArray();
    return items;
}

module.exports = {
    getUser,
    listAllUsers,
    getActiveWord,
    listAllActiveWordsOfUser,
};
