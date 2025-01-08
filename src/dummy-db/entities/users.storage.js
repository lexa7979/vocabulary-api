/** @import * as UtilTypes from "../../utils/types" */
/** @import * as Types from "../types" */

const { getUUID, getTimestampBeforeNow, getTimestampAfterNow } = require('../../utils/dummyData');

/** @type {Types.IUser[]} */
const allUsers = [
    {
        id: getUUID('user1'),
        login: 'user1',
        name: 'User 1',
        currStep: 8,
        learnPath: [
            _getLearnPathItem(7, 'word3', 'adjective-flection2', 100),
            _getLearnPathItem(8, 'word1', 'verb-flection4', null),
        ],
        currentSession: {
            startedAt: getTimestampBeforeNow({ minutes: 10 }),
        },
        currentLessons: [
            {
                wordId: getUUID('word2'),
                flectionId: getUUID('adjective-flection3'),
                result: 'correct',
                doneAt: getTimestampBeforeNow({ minutes: 2 }),
            },
            {
                wordId: getUUID('word1'),
                flectionId: getUUID('verb-flection1'),
            },
        ],
    },
    {
        id: getUUID('user2'),
        login: 'user2',
        name: 'User 2',
        currStep: 0,
        learnPath: [],
    },
];

/**
 * @param {number} step
 * @param {UtilTypes.TGetUuidKeys} wordIdKey
 * @param {UtilTypes.TGetUuidKeys} flectionIdKey
 * @param {number} result
 * @returns {Types.IUser["learnPath"][0]}
 */
function _getLearnPathItem(step, wordIdKey, flectionIdKey, result) {
    const wordId = getUUID(wordIdKey);
    const flectionId = getUUID(flectionIdKey);
    return { step, wordId, flectionId, result };
}

/** @type {Types.IActiveWord[]} */
const allActiveWords = [
    {
        id: getUUID('user1-activeWord1'),
        userId: getUUID('user1'),
        wordId: getUUID('word1'),
        learnProgress: _getLearnProgress(
            // @ts-ignore
            index => `verb-flection${index}`,
            [0, null],
            [0, null],
            [0, null],
            [0, null],
            [0, null]
        ),
        events: [
            {
                type: 'add',
                timestamp: getTimestampBeforeNow({ days: 5 }),
            },
            {
                type: 'flection-result',
                timestamp: getTimestampBeforeNow({ days: 2 }),
                flectionId: getUUID('verb-flection3'),
                result: 'wrong',
            },
            {
                type: 'flection-result',
                timestamp: getTimestampBeforeNow({ days: 1 }),
                flectionId: getUUID('verb-flection1'),
                result: 'correct',
            },
        ],
        nextLessons: [
            {
                flectionId: getUUID('verb-flection1'),
                currGroup: 1,
                earliestAt: getTimestampAfterNow({ days: 1 }),
            },
            {
                flectionId: getUUID('verb-flection2'),
                currGroup: 0,
                earliestAt: getTimestampAfterNow({ days: -5 }),
            },
            {
                flectionId: getUUID('verb-flection3'),
                currGroup: 0,
                earliestAt: getTimestampAfterNow({ days: -1 }),
            },
            {
                flectionId: getUUID('verb-flection4'),
                currGroup: 0,
                earliestAt: getTimestampAfterNow({ days: -5 }),
            },
            {
                flectionId: getUUID('verb-flection5'),
                currGroup: 0,
                earliestAt: getTimestampAfterNow({ days: -5 }),
            },
        ],
    },
    {
        id: getUUID('user1-activeWord2'),
        userId: getUUID('user1'),
        wordId: getUUID('word3'),
        learnProgress: _getLearnProgress(
            // @ts-ignore
            index => `adjective-flection${index}`,
            [0, null],
            [0, null],
            [0, null],
            [0, null],
            [0, null],
            [0, null]
        ),
        events: [
            {
                type: 'add',
                timestamp: getTimestampBeforeNow({ days: 3 }),
            },
            {
                type: 'flection-result',
                timestamp: getTimestampBeforeNow({ days: 2 }),
                flectionId: getUUID('adjective-flection5'),
                result: 'correct',
            },
            {
                type: 'flection-result',
                timestamp: getTimestampBeforeNow({ days: 1 }),
                flectionId: getUUID('adjective-flection2'),
                result: 'wrong',
            },
            {
                type: 'flection-result',
                timestamp: getTimestampBeforeNow({ minutes: 2 }),
                flectionId: getUUID('adjective-flection3'),
                result: 'correct',
            },
        ],
        nextLessons: [
            {
                flectionId: getUUID('adjective-flection1'),
                currGroup: 0,
                earliestAt: getTimestampAfterNow({ days: -3 }),
            },
            {
                flectionId: getUUID('adjective-flection2'),
                currGroup: 0,
                earliestAt: getTimestampAfterNow({ days: 0 }),
            },
            {
                flectionId: getUUID('adjective-flection3'),
                currGroup: 1,
                earliestAt: getTimestampAfterNow({ days: 2, minutes: -2 }),
            },
            {
                flectionId: getUUID('adjective-flection4'),
                currGroup: 0,
                earliestAt: getTimestampAfterNow({ days: -3 }),
            },
            {
                flectionId: getUUID('adjective-flection5'),
                currGroup: 1,
                earliestAt: getTimestampAfterNow({ days: 0 }),
            },
            {
                flectionId: getUUID('adjective-flection6'),
                currGroup: 0,
                earliestAt: getTimestampAfterNow({ days: -3 }),
            },
        ],
    },
];

/**
 * @param {(index: number) => UtilTypes.TGetUuidKeys} getFlectionKey
 * @param {Array<[currGroup: number, changedAt: string]>} dataOfSingleFlections
 * @returns {Types.IActiveWord["learnProgress"]}
 */
function _getLearnProgress(getFlectionKey, ...dataOfSingleFlections) {
    return dataOfSingleFlections.map(([currGroup, changedAt], index) => ({
        flectionId: getUUID(getFlectionKey(index + 1)),
        currGroup,
        changedAt,
    }));
}

module.exports = {
    allUsers,
    allActiveWords,
};
