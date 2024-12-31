const { getUUID } = require('../../utils/dummyData');

const WordClasses = require('./wordClasses');

const { ASYNC, bold, EXPECTS, IS_ACCESSIBLE, REJECTS, RESOLVES, copyObject } = require('../../../test');

const Global = {};

describe('Test-data service "WordClasses"', () => {
    it(`has the expected exports`, () => {
        expect(WordClasses).toEqual({
            getFlection: expect.any(Function),
            getWordClass: expect.any(Function),
            getWordClassWithFlections: expect.any(Function),
            listAllFlectionsOfWordClass: expect.any(Function),
            listAllWordClasses: expect.any(Function),
        });
    });

    runTestsAboutGetWordClass();
    runTestsAboutGetWordClassWithFlections();

    runTestsAboutListAllWordClasses();

    runTestsAboutGetFlection();
    runTestsAboutListAllFlectionsOfWordClass();
});

function runTestsAboutGetWordClass() {
    describe(`${_nextListHint()} has an ${ASYNC} function ${bold('getWordClass()')} which`, () => {
        const { getWordClass } = WordClasses;

        it(IS_ACCESSIBLE, () => expect(getWordClass).toBeFunction());

        it(`${EXPECTS} one argument (classId)`, () => expect(getWordClass.length).toBe(1));

        it(`- when used w/o arguments - ${REJECTS} as expected`, async () => {
            await expect(getWordClass).rejects.toThrow('invalid ID');
        });

        it(`- when used with valid ID - ${RESOLVES} with expected data ${_nextSnapshotHint()}`, async () => {
            const wordClass = await getWordClass(getUUID('verb'));

            const copy = copyObject(wordClass, { replaceUUIDs: true });
            expect(copy).toMatchSnapshot('> word-class "verb" <');
        });
    });
}

function runTestsAboutGetWordClassWithFlections() {
    describe(`${_nextListHint()} has an ${ASYNC} function ${bold('getWordClassWithFlections()')} which`, () => {
        const { getWordClassWithFlections } = WordClasses;

        it(IS_ACCESSIBLE, () => expect(getWordClassWithFlections).toBeFunction());

        it(`${EXPECTS} one argument (classId)`, () => expect(getWordClassWithFlections.length).toBe(1));

        it(`- when used w/o arguments - ${REJECTS} as expected`, async () => {
            await expect(getWordClassWithFlections).rejects.toThrow('invalid ID');
        });

        it(`- when used with valid ID - ${RESOLVES} with expected data ${_nextSnapshotHint()}`, async () => {
            const wordClass = await getWordClassWithFlections(getUUID('verb'));

            const copy = copyObject(wordClass, { replaceUUIDs: true });
            expect(copy).toMatchSnapshot('> word-class "verb" + flections <');
        });
    });
}

function runTestsAboutListAllWordClasses() {
    describe(`${_nextListHint()} has an ${ASYNC} function ${bold('listAllWordClassIds()')} which`, () => {
        const { listAllWordClasses } = WordClasses;

        it(IS_ACCESSIBLE, () => expect(listAllWordClasses).toBeFunction());

        it(`${EXPECTS} no arguments`, () => expect(listAllWordClasses).toHaveLength(0));

        it(`- when used w/o arguments - ${RESOLVES} with expected data ${_nextSnapshotHint()}`, async () => {
            const wordClasses = await listAllWordClasses();

            const copy = copyObject(wordClasses, { replaceUUIDs: true });
            expect(copy).toMatchSnapshot('> all word-classes <');
        });

        it(`- when used with argument "first" - ${RESOLVES} with expected data`, async () => {
            const wordClasses = await listAllWordClasses(1, undefined);

            const copy = copyObject(wordClasses, { replaceUUIDs: true });
            expect(copy.map(({ id }) => id)).toEqual([
                //
                '(ID:verb)',
            ]);
        });

        it(`- when used with argument "offset" - ${RESOLVES} with expected data`, async () => {
            const wordClasses = await listAllWordClasses(undefined, 1);

            const copy = copyObject(wordClasses, { replaceUUIDs: true });
            expect(copy.map(({ id }) => id)).toEqual([
                //
                '(ID:noun)',
                '(ID:adjective)',
            ]);
        });

        it(`- when used with arguments "first" and "offset" - ${RESOLVES} with expected data`, async () => {
            const wordClasses = await listAllWordClasses(1, 1);

            const copy = copyObject(wordClasses, { replaceUUIDs: true });
            expect(copy.map(({ id }) => id)).toEqual([
                //
                '(ID:noun)',
            ]);
        });
    });
}

function runTestsAboutGetFlection() {
    describe(`${_nextListHint()} has an ${ASYNC} function ${bold('getFlection()')} which`, () => {
        const { getFlection } = WordClasses;

        it(IS_ACCESSIBLE, () => expect(getFlection).toBeFunction());

        it(`${EXPECTS} one argument (flectionId)`, () => expect(getFlection).toHaveLength(1));

        it(`- when used w/o argument - ${REJECTS} as expected`, async () => {
            await expect(getFlection).rejects.toThrow('invalid ID');
        });

        it(`- when used with valid ID - ${RESOLVES} with expected data ${_nextSnapshotHint()}`, async () => {
            const flection = await getFlection(getUUID('noun-flection3'));

            const copy = copyObject(flection, { replaceUUIDs: true });
            expect(copy).toMatchSnapshot('> 3rd flection of word-class "noun" <');
        });
    });
}

function runTestsAboutListAllFlectionsOfWordClass() {
    describe(`${_nextListHint()} has an ${ASYNC} function ${bold('listAllFlectionsOfWordClass()')} which`, () => {
        const { listAllFlectionsOfWordClass } = WordClasses;

        it(IS_ACCESSIBLE, () => expect(listAllFlectionsOfWordClass).toBeFunction());

        it(`${EXPECTS} one argument (classId)`, () => expect(listAllFlectionsOfWordClass).toHaveLength(1));

        it(`- when used w/o arguments - ${RESOLVES} with an empty array`, async () => {
            // @ts-ignore
            const result = await listAllFlectionsOfWordClass();
            expect(result).toEqual([]);
        });

        it(`- when used with valid ID - ${RESOLVES} with expected data ${_nextSnapshotHint()}`, async () => {
            const flections = await listAllFlectionsOfWordClass(getUUID('noun'));

            const copy = copyObject(flections, { replaceUUIDs: true });
            expect(copy).toMatchSnapshot('> all flections of word-class "noun" <');
        });

        it(`- when used with valid ID and argument "first" - ${RESOLVES} with expected data`, async () => {
            const result = await listAllFlectionsOfWordClass(getUUID('noun'), 2, undefined);

            const copy = copyObject(result, { replaceUUIDs: true });
            expect(copy.map(({ id }) => id)).toEqual([
                //
                '(ID:noun-flection1)',
                '(ID:noun-flection2)',
            ]);
        });

        it(`- when used with valid ID and argument "offset" - ${RESOLVES} with expected data`, async () => {
            const result = await listAllFlectionsOfWordClass(getUUID('noun'), undefined, 1);

            const copy = copyObject(result, { replaceUUIDs: true });
            expect(copy.map(({ id }) => id)).toEqual([
                '(ID:noun-flection2)',
                '(ID:noun-flection3)',
                '(ID:noun-flection4)',
            ]);
        });

        it(`- when used with valid ID, arguments "first" and "offset" - ${RESOLVES} with expected data`, async () => {
            const result = await listAllFlectionsOfWordClass(getUUID('noun'), 2, 1);

            const copy = copyObject(result, { replaceUUIDs: true });
            expect(copy.map(({ id }) => id)).toEqual([
                //
                '(ID:noun-flection2)',
                '(ID:noun-flection3)',
            ]);
        });
    });
}

/**
 * @returns {string} "(1)", "(2)", "(3)" etc.
 */
function _nextListHint() {
    Global.nextListItemId = Global.nextListItemId == null ? 1 : Global.nextListItemId + 1;
    return `(${Global.nextListItemId})`;
}

/**
 * @returns {string} "[-> check snapshot 1]", "[-> check snapshot 2]" etc.
 */
function _nextSnapshotHint() {
    Global.nextSnapshotId = Global.nextSnapshotId == null ? 1 : Global.nextSnapshotId + 1;
    return `[-> check snapshot ${Global.nextSnapshotId}]`;
}
