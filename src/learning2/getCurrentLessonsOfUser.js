/** @import * as DBTypes from "../db/dummy/types" */

const _isObject = input => input != null && typeof input === 'object';

/** @typedef {"longest-waiting-flection"} TSelectionType */

/**
 * @param {object} inputBag
 * @param {DBTypes.IDataService} inputBag.db
 * @param {DBTypes.UUID} inputBag.userId
 * @param {number} inputBag.startedAt
 * @param {TSelectionType} inputBag.selectionType
 * @returns {Promise<DBTypes.ILesson[]>}
 */
async function getCurrentLessonsOfUser(inputBag) {
    const { db, userId, startedAt, selectionType } = inputBag || {};
    if (!_isObject(db) || !userId || !startedAt || !selectionType) {
        throw new Error('getCurrentLessonsOfUser() failed - missing arguments');
    }

    const activeWords = await db.listAllActiveWordsOfUser(userId);

    /** @type {DBTypes.ILesson[]} */
    const allLessons = [];

    activeWords.forEach(activeWordItem => {
        allLessons.push(..._getCurrentLessonsOfActiveWord({ activeWordItem, startedAt, selectionType }));
    });

    return _shuffle(allLessons);
}

/**
 * @param {object} inputBag
 * @param {DBTypes.IActiveWord} inputBag.activeWordItem
 * @param {number} inputBag.startedAt
 * @param {TSelectionType} inputBag.selectionType
 * @returns {DBTypes.ILesson[]}
 */
function _getCurrentLessonsOfActiveWord({ activeWordItem, startedAt, selectionType }) {
    const { nextLessons, wordId } = activeWordItem;
    if (!nextLessons) {
        return [];
    }

    const pendingLessonsOfWord = nextLessons.filter(item => item.earliestAt <= startedAt);
    if (pendingLessonsOfWord.length === 0) {
        return [];
    }

    pendingLessonsOfWord.sort((itemA, itemB) => itemA.earliestAt - itemB.earliestAt);

    switch (selectionType) {
        case 'longest-waiting-flection': {
            const { flectionId } = pendingLessonsOfWord[0];
            return [{ wordId, flectionId }];
        }
        default:
            throw new Error(`Unknown selectionType "${selectionType}"`);
    }
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
function _shuffle(arr) {
    return arr
        .map(item => ({ item, randomIndex: Math.random() }))
        .sort((itemA, itemB) => itemA.randomIndex - itemB.randomIndex)
        .map(({ item }) => item);
}

module.exports = { getCurrentLessonsOfUser };
