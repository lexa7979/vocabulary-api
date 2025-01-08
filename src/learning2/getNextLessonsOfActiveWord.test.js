/** @import * as DBTypes from "../db/types" */

const { bold, IS_ACCESSIBLE, EXPECTS, RESOLVES, RETURNS, REJECTS, CALLS, copyObject } = require('../../test');
const { getUUID, getTimestampBeforeNow } = require('../utils/dummyData');
const { getNextLessonsOfActiveWord } = require('./getNextLessonsOfActiveWord');

describe(`Learning utility ${bold('getNextLessonsOfActiveWord()')}`, () => {
    const wordId = getUUID('word1');
    const activeWordId = getUUID('user1-activeWord1');
    const classId = getUUID('verb');
    const flectionId1 = getUUID('verb-flection1');
    const flectionId2 = getUUID('verb-flection2');
    const translationId1 = getUUID('word1-translation1');
    const translationId2 = getUUID('word1-translation2');

    /** @type {DBTypes.ITranslation[]} */
    const testTranslations = [
        { id: translationId1, wordId, flectionId: flectionId1, text_de: 'gehen', text_sv: 'att gå' },
        { id: translationId2, wordId, flectionId: flectionId2, text_de: 'Geh!', text_sv: 'Gå!' },
    ];

    /** @type {DBTypes.IFlection[]} */
    const testFlections = [
        { id: flectionId1, classId, name_de: 'Infinitiv', pos: 0 },
        { id: flectionId2, classId, name_de: 'Imparativ', pos: 1 },
    ];

    /** @type {DBTypes.IActiveWordEvent} */
    const addEvent = { type: 'add', timestamp: getTimestampBeforeNow({ days: 10 }) };

    /**
     * @param {object} inputBag
     * @param {DBTypes.ITranslation[]} inputBag.translations
     * @param {DBTypes.IFlection[]} inputBag.flections
     * @param {DBTypes.IActiveWordEvent[]} inputBag.events
     * @returns {DBTypes.IDataService}
     */
    function _getFakeDataService({ translations, flections, events }) {
        /** @type {DBTypes.IDataService} */ // @ts-ignore
        const db = {
            getActiveWord: jest.fn().mockReturnValue({ id: activeWordId, wordId, events }),
            getWordWithTranslations: jest.fn().mockReturnValue({ id: wordId, classId, translations }),
            getWordClassWithFlections: jest.fn().mockReturnValue({ id: classId, flections }),
        };
        return db;
    }

    /**
     * @param {DBTypes.TResult} result
     * @param {DBTypes.UUID} flectionId
     * @param {number} timestamp
     */
    function _getResultEvent(result, flectionId, timestamp) {
        /** @type {DBTypes.IActiveWordEvent} */
        const event = { type: 'flection-result', timestamp, flectionId, result };
        return event;
    }

    /** @param {number} timestamp */
    function _getRevokeEvent(timestamp) {
        /** @type {DBTypes.IActiveWordEvent} */
        const event = { type: 'flection-result-revoke', timestamp };
        return event;
    }

    it(IS_ACCESSIBLE, () => expect(getNextLessonsOfActiveWord).toBeFunction());

    it(`${EXPECTS} one argument ({ db, activeWordId })`, () => expect(getNextLessonsOfActiveWord).toHaveLength(1));

    it(`${RETURNS} a Promise`, async () => {
        try {
            // @ts-ignore
            const resultSync = getNextLessonsOfActiveWord();
            expect(resultSync).toBeInstanceOf(Promise);
            await resultSync;
        } catch (error) {} // eslint-disable-line no-empty
    });

    it(`- when used w/o arguments - ${REJECTS} as expected`, () =>
        expect(getNextLessonsOfActiveWord).rejects.toThrow('missing arguments'));

    it(`- when used with valid arguments - ${CALLS} expected DB-methods`, async () => {
        const db = _getFakeDataService({ translations: [], flections: [], events: [] });
        await getNextLessonsOfActiveWord({ db, activeWordId });

        expect(db.getActiveWord).toHaveBeenCalledExactlyOnceWith(activeWordId);
        expect(db.getWordWithTranslations).toHaveBeenCalledExactlyOnceWith(wordId);
        expect(db.getWordClassWithFlections).toHaveBeenCalledExactlyOnceWith(classId);
    });

    it(`- when used with a word w/o translations - ${RESOLVES} with an empty array`, async () => {
        const db = _getFakeDataService({ translations: [], flections: testFlections, events: [addEvent] });
        const result = await getNextLessonsOfActiveWord({ db, activeWordId });

        expect(result).toEqual([]);
    });

    it(`- when used with a word-class w/o flections - ${RESOLVES} with an empty array`, async () => {
        const db = _getFakeDataService({ translations: testTranslations, flections: [], events: [addEvent] });
        const result = await getNextLessonsOfActiveWord({ db, activeWordId });

        expect(result).toEqual([]);
    });

    it(`- when used with an active-word w/o events - ${RESOLVES} with an empty array`, async () => {
        const db = _getFakeDataService({ translations: testTranslations, flections: testFlections, events: [] });
        const result = await getNextLessonsOfActiveWord({ db, activeWordId });

        expect(result).toEqual([]);
    });

    it(`- when used with a single "add"-event - ${RESOLVES} with the expected array`, async () => {
        const events = [addEvent];

        const db = _getFakeDataService({ translations: testTranslations, flections: testFlections, events });
        const result = await getNextLessonsOfActiveWord({ db, activeWordId });

        expect(copyObject(result, { replaceAllSpecials: true })).toEqual([
            { flectionId: '(ID:verb-flection1)', currGroup: 0, earliestAt: '(TS:-10d)' },
            { flectionId: '(ID:verb-flection2)', currGroup: 0, earliestAt: '(TS:-10d)' },
        ]);
    });

    it(`- when used with less translations - ${RESOLVES} with the expected array`, async () => {
        const events = [addEvent];

        const db = _getFakeDataService({ translations: [testTranslations[1]], flections: testFlections, events });
        const result = await getNextLessonsOfActiveWord({ db, activeWordId });

        expect(copyObject(result, { replaceAllSpecials: true })).toEqual([
            { flectionId: '(ID:verb-flection2)', currGroup: 0, earliestAt: '(TS:-10d)' },
        ]);
    });

    it(`- when also used with one "correct result"-event - ${RESOLVES} with the expected array`, async () => {
        const events = [
            //
            addEvent,
            _getResultEvent('correct', flectionId1, getTimestampBeforeNow({ days: 8 })),
        ];

        const db = _getFakeDataService({ translations: testTranslations, flections: testFlections, events });
        const result = await getNextLessonsOfActiveWord({ db, activeWordId });

        expect(copyObject(result, { replaceAllSpecials: true })).toEqual([
            { flectionId: '(ID:verb-flection1)', currGroup: 1, earliestAt: '(TS:-6d 12h)' },
            { flectionId: '(ID:verb-flection2)', currGroup: 0, earliestAt: '(TS:-10d)' },
        ]);
    });

    it(`- when also used with one "wrong result"-event - ${RESOLVES} with the expected array`, async () => {
        const events = [
            //
            addEvent,
            _getResultEvent('wrong', flectionId1, getTimestampBeforeNow({ days: 8 })),
        ];

        const db = _getFakeDataService({ translations: testTranslations, flections: testFlections, events });
        const result = await getNextLessonsOfActiveWord({ db, activeWordId });

        expect(copyObject(result, { replaceAllSpecials: true })).toEqual([
            { flectionId: '(ID:verb-flection1)', currGroup: 0, earliestAt: '(TS:-7d 12h)' },
            { flectionId: '(ID:verb-flection2)', currGroup: 0, earliestAt: '(TS:-10d)' },
        ]);
    });

    it(`- when also used with one "partly-correct result"-event - ${RESOLVES} with the expected array`, async () => {
        const events = [
            //
            addEvent,
            _getResultEvent('partly-correct', flectionId1, getTimestampBeforeNow({ days: 8 })),
        ];

        const db = _getFakeDataService({ translations: testTranslations, flections: testFlections, events });
        const result = await getNextLessonsOfActiveWord({ db, activeWordId });

        expect(copyObject(result, { replaceAllSpecials: true })).toEqual([
            { flectionId: '(ID:verb-flection1)', currGroup: 0, earliestAt: '(TS:-7d 12h)' },
            { flectionId: '(ID:verb-flection2)', currGroup: 0, earliestAt: '(TS:-10d)' },
        ]);
    });

    it(`- when used with several "correct result"-events - ${RESOLVES} with the expected array`, async () => {
        const events = [
            addEvent,
            _getResultEvent('correct', flectionId1, getTimestampBeforeNow({ days: 8, hours: 12 })),
            _getResultEvent('correct', flectionId2, getTimestampBeforeNow({ days: 7 })),
            _getResultEvent('correct', flectionId2, getTimestampBeforeNow({ days: 5 })),
            _getResultEvent('correct', flectionId1, getTimestampBeforeNow({ days: 4 })),
            _getResultEvent('correct', flectionId2, getTimestampBeforeNow({ days: 2 })),
        ];

        const db = _getFakeDataService({ translations: testTranslations, flections: testFlections, events });
        const result = await getNextLessonsOfActiveWord({ db, activeWordId });

        expect(copyObject(result, { replaceAllSpecials: true })).toEqual([
            { flectionId: '(ID:verb-flection1)', currGroup: 2, earliestAt: '(TS:-1d 4h)' },
            { flectionId: '(ID:verb-flection2)', currGroup: 3, earliestAt: '(TS:+3d 20h)' },
        ]);
    });

    it(`- when also used with "wrong result"-events - ${RESOLVES} with the expected array`, async () => {
        const events = [
            addEvent,
            _getResultEvent('correct', flectionId1, getTimestampBeforeNow({ days: 9, hours: 12 })),
            _getResultEvent('correct', flectionId2, getTimestampBeforeNow({ days: 8 })),
            _getResultEvent('correct', flectionId2, getTimestampBeforeNow({ days: 6 })),
            _getResultEvent('correct', flectionId1, getTimestampBeforeNow({ days: 5 })),
            _getResultEvent('wrong', flectionId2, getTimestampBeforeNow({ days: 3 })),
            _getResultEvent('wrong', flectionId1, getTimestampBeforeNow({ days: 2 })),
            _getResultEvent('correct', flectionId2, getTimestampBeforeNow({ days: 1 })),
        ];

        const db = _getFakeDataService({ translations: testTranslations, flections: testFlections, events });
        const result = await getNextLessonsOfActiveWord({ db, activeWordId });

        expect(copyObject(result, { replaceAllSpecials: true })).toEqual([
            { flectionId: '(ID:verb-flection1)', currGroup: 1, earliestAt: '(TS:-12h)' },
            { flectionId: '(ID:verb-flection2)', currGroup: 2, earliestAt: '(TS:+1d 20h)' },
        ]);
    });

    it(`- when also used with "partly-correct result"-events - ${RESOLVES} with the expected array`, async () => {
        const events = [
            addEvent,
            _getResultEvent('correct', flectionId1, getTimestampBeforeNow({ days: 9, hours: 12 })),
            _getResultEvent('correct', flectionId2, getTimestampBeforeNow({ days: 8 })),
            _getResultEvent('correct', flectionId2, getTimestampBeforeNow({ days: 6 })),
            _getResultEvent('correct', flectionId1, getTimestampBeforeNow({ days: 5 })),
            _getResultEvent('partly-correct', flectionId2, getTimestampBeforeNow({ days: 3 })),
            _getResultEvent('partly-correct', flectionId1, getTimestampBeforeNow({ days: 2 })),
        ];

        const db = _getFakeDataService({ translations: testTranslations, flections: testFlections, events });
        const result = await getNextLessonsOfActiveWord({ db, activeWordId });

        expect(copyObject(result, { replaceAllSpecials: true })).toEqual([
            { flectionId: '(ID:verb-flection1)', currGroup: 2, earliestAt: '(TS:+20h)' },
            { flectionId: '(ID:verb-flection2)', currGroup: 2, earliestAt: '(TS:-4h)' },
        ]);
    });

    it(`- when also used with a "revoke result"-event - ${RESOLVES} with the expected array`, async () => {
        const events1 = [
            addEvent,
            _getResultEvent('correct', flectionId1, getTimestampBeforeNow({ days: 8, hours: 12 })),
            _getResultEvent('correct', flectionId2, getTimestampBeforeNow({ days: 7 })),
        ];
        const events2 = [
            ...events1,
            _getResultEvent('correct', flectionId2, getTimestampBeforeNow({ days: 5, minutes: 5 })),
            _getRevokeEvent(getTimestampBeforeNow({ days: 5 })),
        ];

        const db1 = _getFakeDataService({ translations: testTranslations, flections: testFlections, events: events1 });
        const result1 = await getNextLessonsOfActiveWord({ db: db1, activeWordId });

        const db2 = _getFakeDataService({ translations: testTranslations, flections: testFlections, events: events2 });
        const result2 = await getNextLessonsOfActiveWord({ db: db2, activeWordId });

        expect(result1).toEqual(result2);
    });
});
