const DummyData = require('./dummyData');

const { bold, IS_ACCESSIBLE, EXPECTS, RETURNS, green, copyObject, FAILS, WORKS } = require('../../test');

const { resetReplaceActions, listReplaceActions } = require('../../test/copy')._testInternals;

describe(`Utility "dummyData"`, () => {
    it(`has all expected exports`, () => {
        expect(copyObject(DummyData, { replaceFunctions: true })).toEqual({
            getUUID: '(FUNC:getUUID)',
            findKeyOfUUID: '(FUNC:findKeyOfUUID)',

            getTimestampBeforeNow: '(FUNC:getTimestampBeforeNow)',
            getTimestampAfterNow: '(FUNC:getTimestampAfterNow)',

            _testInternals: {
                resetGlobalNow: '(FUNC:resetGlobalNow)',
                resetIdBuffer: '(FUNC:resetIdBuffer)',
            },
        });
    });

    runTestsAboutGetUUID();
    runTestsAboutFindKeyOfUUID();

    runTestsAboutGetTimestampBeforeNow();
});

function runTestsAboutGetUUID() {
    describe(`has a function ${bold('getUUID()')} which`, () => {
        const { getUUID } = DummyData;

        const matchUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        const testKey = 'user1';

        it(IS_ACCESSIBLE, () => expect(getUUID).toBeFunction());

        it(`${EXPECTS} one argument (key)`, () => expect(getUUID).toHaveLength(1));

        // @ts-ignore
        it(`- when used w/o argument - ${RETURNS} an UUID`, () => expect(getUUID()).toMatch(matchUUID));

        it(`- when used with "key" - ${RETURNS} an UUID`, () => expect(getUUID(testKey)).toMatch(matchUUID));

        it(`- when used twice with same "key" - ${RETURNS} same UUID`, () => {
            const result1 = getUUID(testKey);
            const result2 = getUUID(testKey);
            expect(result1).toBe(result2);
        });

        it(`- when used twice with different "key" - ${RETURNS} different UUIDs`, () => {
            // @ts-ignore
            const result1 = getUUID('key1');
            // @ts-ignore
            const result2 = getUUID('key2');
            expect(result1).not.toBe(result2);
        });

        it(`${green('registers')} a new action "replaceUUIDs" for ${bold(
            'copyObject()'
        )} that ${WORKS} as expected`, () => {
            DummyData._testInternals.resetIdBuffer();
            const obj = {
                name: 'testName',
                testId1: '53a52f15-c0b7-421e-a7d6-03f8f7aa90c9',
                testId2: '3676f392-4896-4636-b47b-b9d696350248',
            };

            resetReplaceActions();
            expect(copyObject(obj)).toEqual(obj);
            expect(() => copyObject(obj, { replaceUUIDs: true })).toThrow('unknown option');

            obj.testId1 = getUUID(testKey);

            expect(copyObject(obj, { replaceUUIDs: true })).toEqual({
                name: 'testName',
                testId1: `(ID:${testKey})`,
                testId2: '(ID:null)',
            });
        });
    });
}

function runTestsAboutFindKeyOfUUID() {
    describe(`has a function ${bold('findKeyOfUUID()')} which`, () => {
        const { findKeyOfUUID } = DummyData;

        it(IS_ACCESSIBLE, () => expect(findKeyOfUUID).toBeFunction());

        it(`${EXPECTS} one argument (id)`, () => expect(findKeyOfUUID).toBeFunction());

        // @ts-ignore
        it(`- when used w/o argument - ${RETURNS} null`, () => expect(findKeyOfUUID()).toBeNull());

        it(`- when used with unknown "id" - ${RETURNS} null`, () => {
            DummyData._testInternals.resetIdBuffer();

            expect(findKeyOfUUID('53a52f15-c0b7-421e-a7d6-03f8f7aa90c9')).toBeNull();
        });

        it(`- when used with "id" delivered by getUUID() - ${RETURNS} correct key of ID`, () => {
            // @ts-ignore
            const testId = DummyData.getUUID('testKey');

            expect(findKeyOfUUID(testId)).toBe('testKey');
        });
    });
}

function runTestsAboutGetTimestampBeforeNow() {
    describe(`has a function ${bold('getTimestampBeforeNow()')} which`, () => {
        const { getTimestampBeforeNow } = DummyData;

        it(IS_ACCESSIBLE, () => expect(getTimestampBeforeNow).toBeFunction());

        it(`${EXPECTS} one argument (inputBag)`, () => expect(getTimestampBeforeNow).toHaveLength(1));

        it(`- when used w/o arguments - ${FAILS} as expected`, () => {
            expect(getTimestampBeforeNow).toThrow('Cannot read prop');
        });

        it(`- when used with "minutes" in inputBag - ${RETURNS} a timestamp as number`, () => {
            const result = getTimestampBeforeNow({ minutes: 7 });
            expect(result).toBeGreaterThanOrEqual(1000000000000);
            expect(result).toBeLessThanOrEqual(5000000000000);
        });

        it(`- when used with "minutes" in inputBag - ${WORKS} as expected`, () => {
            const result1 = getTimestampBeforeNow({ minutes: 7 });
            const result2 = getTimestampBeforeNow({ minutes: 17 });
            expect(result1 - result2).toBe(600000);

            const now = new Date().getTime();
            expect(now).toBeGreaterThan(result1);
            expect(now).toBeGreaterThan(result2);

            const before30minutes = now - 30 * 60000;
            expect(before30minutes).toBeLessThan(result1);
            expect(before30minutes).toBeLessThan(result2);
        });

        it(`- when used twice with "minutes" in inputBag - ${RETURNS} same number`, async () => {
            const result1 = getTimestampBeforeNow({ minutes: 7 });
            await new Promise(resolve => {
                setTimeout(resolve, 200);
            });
            const result2 = getTimestampBeforeNow({ minutes: 7 });
            expect(result1).toBe(result2);
        });

        it(`${green('registers')} a new action "replaceTimestamps" for ${bold(
            'copyObject()'
        )} that ${WORKS} as expected`, () => {
            DummyData._testInternals.resetGlobalNow();
            const obj = {
                num: 179,
                now: new Date().getTime(),
                '30minutesAgo': new Date().getTime() - 30 * 60000,
                tomorrow: new Date().getTime() + 24 * 60 * 60000,
                testTimestampsBeforeNow: [],
            };

            resetReplaceActions();
            expect(copyObject(obj)).toEqual(obj);
            expect(() => copyObject(obj, { replaceTimestamps: true })).toThrow('unknown option');

            obj.testTimestampsBeforeNow.push(
                getTimestampBeforeNow({ minutes: 7 }),
                getTimestampBeforeNow({ hours: 4 }),
                getTimestampBeforeNow({ days: 1 }),
                getTimestampBeforeNow({ days: 2 }),
                getTimestampBeforeNow({ minutes: 7, hours: 4, days: 2 })
            );

            // @ts-ignore
            expect(listReplaceActions().replaceTimestamps).toBeFunction();
            expect(copyObject(obj, { replaceTimestamps: true })).toEqual({
                num: 179,
                now: '(TS:now)',
                '30minutesAgo': '(TS:-30min)',
                tomorrow: '(TS:tomorrow)',
                testTimestampsBeforeNow: ['(TS:-7min)', '(TS:-4h)', '(TS:yesterday)', '(TS:-2d)', '(TS:-2d 4h 7min)'],
            });
        });
    });
}
