/** @import * as DBTypes from "../dummy-db/types" */
/** @import {TSelectionType} from "./getCurrentLessonsOfUser" */

/** @typedef {Parameters<typeof getCurrentLessonsOfUser>[0]} IInputBag */

const seedrandom = require('seedrandom');

const { bold, IS_ACCESSIBLE, EXPECTS, RETURNS, REJECTS, CALLS, RESOLVES, copyObject } = require('../../test');
const { getUUID, getTimestampBeforeNow, getTimestampAfterNow } = require('../utils/dummyData');
const { getCurrentLessonsOfUser } = require('./getCurrentLessonsOfUser');

describe(`Learning utility ${bold('getCurrentLessonsOfUser()')}`, () => {
    const userId = getUUID('user1');
    const fakeNow = getTimestampBeforeNow({ days: 0 });

    /** @param {{activeWords:DBTypes.IActiveWord[]}} inputBag */
    function _getFakeDataService({ activeWords }) {
        /** @type {DBTypes.IDataService} */ // @ts-ignore
        const db = {
            listAllActiveWordsOfUser: jest.fn().mockResolvedValue(activeWords),
        };
        return db;
    }

    /**
     * @param {DBTypes.INextLesson[]} [nextLessons1]
     * @param {DBTypes.INextLesson[]} [nextLessons2]
     * @param {DBTypes.INextLesson[]} [nextLessons3]
     */
    function _getFakeActiveWords(nextLessons1 = null, nextLessons2 = null, nextLessons3 = null) {
        /** @type {DBTypes.IActiveWord[]} */
        const activeWords = [];
        const _push = (id, wordId, nextLessons) => {
            if (nextLessons) {
                activeWords.push({ id, userId, wordId, nextLessons });
            }
        };
        _push(getUUID('user1-activeWord1'), getUUID('word1'), nextLessons1);
        _push(getUUID('user1-activeWord2'), getUUID('word2'), nextLessons2);
        _push(getUUID('user1-activeWord3'), getUUID('word3'), nextLessons3);
        return activeWords;
    }

    it(IS_ACCESSIBLE, () => expect(getCurrentLessonsOfUser).toBeFunction());

    it(`${EXPECTS} one argument ({ db, userId, startedAt, selectionType })`, () => {
        expect(getCurrentLessonsOfUser).toHaveLength(1);
    });

    it(`${RETURNS} a Promise`, async () => {
        try {
            // @ts-ignore
            const syncResult = getCurrentLessonsOfUser();
            expect(syncResult).toBeInstanceOf(Promise);
            await syncResult;
        } catch (error) {} // eslint-disable-line no-empty
    });

    it(`- when used w/o arguments - ${REJECTS} as expected`, () =>
        expect(getCurrentLessonsOfUser).rejects.toThrow('missing arguments'));

    it(`- when used with valid arguments - ${CALLS} expected DB-functions`, async () => {
        const db = _getFakeDataService({ activeWords: [] });
        await getCurrentLessonsOfUser({
            db,
            userId,
            startedAt: fakeNow,
            selectionType: 'longest-waiting-flection',
        });

        expect(db.listAllActiveWordsOfUser).toHaveBeenCalledExactlyOnceWith(userId);
    });

    it(`- when the user has no active words - ${RESOLVES} with an empty array`, async () => {
        const result = await getCurrentLessonsOfUser({
            db: _getFakeDataService({ activeWords: [] }),
            userId,
            startedAt: fakeNow,
            selectionType: 'longest-waiting-flection',
        });

        expect(result).toEqual([]);
    });

    it(`- when the user's active words have empty "nextLessons" - ${RESOLVES} with an empty array`, async () => {
        const activeWords = _getFakeActiveWords([], []);

        const result = await getCurrentLessonsOfUser({
            db: _getFakeDataService({ activeWords }),
            userId,
            startedAt: fakeNow,
            selectionType: 'longest-waiting-flection',
        });

        expect(result).toEqual([]);
    });

    it(`- when all flections have "earliestAt" in the future - ${RESOLVES} with an empty array`, async () => {
        const activeWords = _getFakeActiveWords([
            { flectionId: getUUID('verb-flection1'), currGroup: 1, earliestAt: getTimestampAfterNow({ days: 1 }) },
            { flectionId: getUUID('verb-flection2'), currGroup: 2, earliestAt: getTimestampAfterNow({ days: 2 }) },
            { flectionId: getUUID('verb-flection3'), currGroup: 3, earliestAt: getTimestampAfterNow({ days: 3 }) },
        ]);

        const result = await getCurrentLessonsOfUser({
            db: _getFakeDataService({ activeWords }),
            userId,
            startedAt: fakeNow,
            selectionType: 'longest-waiting-flection',
        });

        expect(result).toEqual([]);
    });

    it(`- when one flection has "earliestAt" right now, the others are in the future - ${RESOLVES} with an array including that flection`, async () => {
        const activeWords = _getFakeActiveWords([
            { flectionId: getUUID('verb-flection1'), currGroup: 1, earliestAt: getTimestampAfterNow({ days: 1 }) },
            { flectionId: getUUID('verb-flection2'), currGroup: 2, earliestAt: getTimestampAfterNow({ days: 2 }) },
            { flectionId: getUUID('verb-flection3'), currGroup: 3, earliestAt: fakeNow },
        ]);

        const result = await getCurrentLessonsOfUser({
            db: _getFakeDataService({ activeWords }),
            userId,
            startedAt: fakeNow,
            selectionType: 'longest-waiting-flection',
        });

        expect(copyObject(result, { replaceAllSpecials: true })).toEqual([
            { flectionId: '(ID:verb-flection3)', wordId: '(ID:word1)' },
        ]);
    });

    it(`- when some flections have "earliestAt" in the past - ${RESOLVES} with an array including the longest-waiting flection`, async () => {
        seedrandom('entropy faked', { global: true });

        const activeWords = _getFakeActiveWords(
            [
                { flectionId: getUUID('verb-flection1'), currGroup: 1, earliestAt: getTimestampAfterNow({ days: -1 }) },
                { flectionId: getUUID('verb-flection2'), currGroup: 2, earliestAt: getTimestampAfterNow({ days: -2 }) },
                { flectionId: getUUID('verb-flection3'), currGroup: 3, earliestAt: getTimestampAfterNow({ days: 3 }) },
            ],
            [
                { flectionId: getUUID('noun-flection1'), currGroup: 0, earliestAt: getTimestampAfterNow({ days: 2 }) },
                { flectionId: getUUID('noun-flection2'), currGroup: 1, earliestAt: getTimestampAfterNow({ days: -1 }) },
                { flectionId: getUUID('noun-flection3'), currGroup: 2, earliestAt: getTimestampAfterNow({ days: -1 }) },
            ]
        );

        const result = await getCurrentLessonsOfUser({
            db: _getFakeDataService({ activeWords }),
            userId,
            startedAt: fakeNow,
            selectionType: 'longest-waiting-flection',
        });

        expect(copyObject(result, { replaceAllSpecials: true })).toEqual([
            { flectionId: '(ID:noun-flection2)', wordId: '(ID:word2)' },
            { flectionId: '(ID:verb-flection2)', wordId: '(ID:word1)' },
        ]);
    });

    it(`- when several flections are found - ${RESOLVES} with a shuffled array`, async () => {
        seedrandom('faked entropy for testing', { global: true });

        const activeWords = _getFakeActiveWords(
            [{ flectionId: getUUID('verb-flection1'), currGroup: 1, earliestAt: getTimestampAfterNow({ days: -1 }) }],
            [{ flectionId: getUUID('noun-flection1'), currGroup: 0, earliestAt: getTimestampAfterNow({ days: -2 }) }],
            [{ flectionId: getUUID('adjective-flection1'), currGroup: 0, earliestAt: fakeNow }]
        );
        const db = _getFakeDataService({ activeWords });

        /** @type {IInputBag} */
        const inputBag = { db, userId, startedAt: fakeNow, selectionType: 'longest-waiting-flection' };

        const result1 = await getCurrentLessonsOfUser(inputBag);
        const result2 = await getCurrentLessonsOfUser(inputBag);
        const result3 = await getCurrentLessonsOfUser(inputBag);

        expect(copyObject(result1, { replaceAllSpecials: true })).toEqual([
            { flectionId: '(ID:verb-flection1)', wordId: '(ID:word1)' },
            { flectionId: '(ID:noun-flection1)', wordId: '(ID:word2)' },
            { flectionId: '(ID:adjective-flection1)', wordId: '(ID:word3)' },
        ]);

        expect(copyObject(result2, { replaceAllSpecials: true })).toEqual([
            { flectionId: '(ID:adjective-flection1)', wordId: '(ID:word3)' },
            { flectionId: '(ID:verb-flection1)', wordId: '(ID:word1)' },
            { flectionId: '(ID:noun-flection1)', wordId: '(ID:word2)' },
        ]);

        expect(copyObject(result3, { replaceAllSpecials: true })).toEqual([
            { flectionId: '(ID:noun-flection1)', wordId: '(ID:word2)' },
            { flectionId: '(ID:adjective-flection1)', wordId: '(ID:word3)' },
            { flectionId: '(ID:verb-flection1)', wordId: '(ID:word1)' },
        ]);
    });

    it(`- when used with valid flections but an invalid "selectionType" - ${REJECTS} as expected`, async () => {
        seedrandom('entropy faked', { global: true });

        const activeWords = _getFakeActiveWords(
            [{ flectionId: getUUID('verb-flection1'), currGroup: 1, earliestAt: getTimestampAfterNow({ days: -1 }) }],
            [{ flectionId: getUUID('noun-flection1'), currGroup: 0, earliestAt: getTimestampAfterNow({ days: -2 }) }],
            [{ flectionId: getUUID('adjective-flection1'), currGroup: 0, earliestAt: fakeNow }]
        );
        const db = _getFakeDataService({ activeWords });

        /** @type {TSelectionType} */ // @ts-ignore
        const selectionType = 'hui-bui';

        /** @type {IInputBag} */
        const inputBag = { db, userId, startedAt: fakeNow, selectionType };

        await expect(getCurrentLessonsOfUser(inputBag)).rejects.toThrow('Unknown selectionType');
    });
});
