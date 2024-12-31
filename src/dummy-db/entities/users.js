const { allUsers, allActiveWords } = require('./users.storage');

/**
 * @param {import('../types').UUID} id
 * @throws
 */
async function getUser(id) {
    const user = allUsers.filter(item => item.id === id)[0];
    if (user == null) {
        throw new Error(`getUser() failed - invalid ID (${id})`);
    }
    return { ...user };
}

/**
 * @param {number} [first]
 * @param {number} [offset]
 */
async function listAllUsers(first = 0, offset = 0) {
    const list = allUsers.slice(offset, first ? offset + first : undefined);

    const results = list.map(user => ({ ...user }));
    return results;
}

/**
 * @param {import('../types').UUID} id
 * @throws
 */
async function getActiveWord(id) {
    const activeWord = allActiveWords.filter(item => item.id === id)[0];
    if (activeWord == null) {
        throw new Error(`getActiveWord() failed - invalid ID (${id})`);
    }
    return activeWord;
}

/**
 * @param {import('../types').UUID} userId
 * @param {number} [first]
 * @param {number} [offset]
 * @returns {Promise<Array<import('../types').IActiveWord>>}
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
