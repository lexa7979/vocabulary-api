/** @import * as Types from "../types" */

const { allUsers, allActiveWords } = require('./users.storage');

/**
 * @param {Types.UUID} userId
 * @throws
 * @returns {Promise<Types.IUser>}
 */
async function getUser(userId) {
    const user = allUsers.filter(item => item.id === userId)[0];
    if (user == null) {
        throw new Error(`getUser() failed - invalid ID (${userId})`);
    }
    return { ...user };
}

/**
 * @param {number} [first]
 * @param {number} [offset]
 * @returns {Promise<Types.IUser[]>}
 */
async function listAllUsers(first = 0, offset = 0) {
    const list = allUsers.slice(offset, first ? offset + first : undefined);

    const results = list.map(user => ({ ...user }));
    return results;
}

/**
 * @param {Types.UUID} activeWordId
 * @throws
 * @returns {Promise<Types.IActiveWord>}
 */
async function getActiveWord(activeWordId) {
    const activeWord = allActiveWords.filter(item => item.id === activeWordId)[0];
    if (activeWord == null) {
        throw new Error(`getActiveWord() failed - invalid ID (${activeWordId})`);
    }
    return activeWord;
}

/**
 * @param {Types.UUID} userId
 * @param {number} [first]
 * @param {number} [offset]
 * @returns {Promise<Types.IActiveWord[]>}
 */
async function listAllActiveWordsOfUser(userId, first = 0, offset = 0) {
    const list = allActiveWords
        .filter(item => item.userId === userId)
        .slice(offset, first ? offset + first : undefined);

    const results = list.map(activeWord => ({ ...activeWord }));
    return results;
}

module.exports = {
    getUser,
    listAllUsers,

    getActiveWord,
    listAllActiveWordsOfUser,
};
