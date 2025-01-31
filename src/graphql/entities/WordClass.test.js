const db = require('../../db/dummy');
const { getUUID } = require('../../utils/dummyData');

const { resolvers } = require('./WordClass');

const { bold, RESOLVES, ASYNC, IS_ACCESSIBLE, EXPECTS, copyObject } = require('../../../test');

const context = { db };

describe(`GraphQL entity WordClass`, () => {
    it(`has all expected resolvers`, () => {
        expect(resolvers).toEqual({
            Flection: {
                wordClass: expect.any(Function),
            },
            Query: {
                wordClass: expect.any(Function),
                wordClasses: expect.any(Function),
            },
            WordClass: {
                flections: expect.any(Function),
            },
        });
    });

    runTestsAboutQueryWithWordClass();
    runTestsAboutQueryWithWordClasses();

    runTestsAboutWordClassWithFlections();

    runTestsAboutFlectionWithWordClass();
});

function runTestsAboutQueryWithWordClass() {
    describe(`has an ${ASYNC} function ${bold('Query.wordClass()')} which`, () => {
        const { wordClass } = resolvers.Query;

        it(IS_ACCESSIBLE, () => expect(wordClass).toBeFunction());

        it(`${EXPECTS} three arguments (parent, args, context)`, () => expect(wordClass).toHaveLength(3));

        it(`- when used with class-ID in "args" - ${RESOLVES} as expected`, async () => {
            const parent = null;
            const args = { id: getUUID('noun') };

            const result = await wordClass(parent, args, context);

            const copy = copyObject(result, { replaceUUIDs: true });
            expect(copy).toEqual({
                id: '(ID:noun)',
                name_de: 'Substantiv',
            });
        });
    });
}

function runTestsAboutQueryWithWordClasses() {
    describe(`has an ${ASYNC} function ${bold('Query.wordClasses()')} which`, () => {
        const { wordClasses } = resolvers.Query;

        it(IS_ACCESSIBLE, () => expect(wordClasses).toBeFunction());

        it(`${EXPECTS} three arguments (parent, args, context)`, () => expect(wordClasses).toHaveLength(3));

        it(`- when used with "first" and "offset" in "args" - ${RESOLVES} as expected`, async () => {
            const parent = null;
            const args = { first: 2, offset: 1 };

            const result = await wordClasses(parent, args, context);

            const copy = copyObject(result, { replaceUUIDs: true });
            expect(copy).toEqual([
                { id: '(ID:noun)', name_de: 'Substantiv' },
                { id: '(ID:adjective)', name_de: 'Adjektiv' },
            ]);
        });
    });
}

function runTestsAboutWordClassWithFlections() {
    describe(`has an ${ASYNC} function ${bold('WordClass.flections()')} which`, () => {
        const { flections } = resolvers.WordClass;

        it(IS_ACCESSIBLE, () => expect(flections).toBeFunction());

        it(`${EXPECTS} three arguments (parent, args, context)`, () => expect(flections).toHaveLength(3));

        it(`- when used with class-ID in "parent", "first" and "offset" in "args" - ${RESOLVES} as expected`, async () => {
            const parent = { id: getUUID('noun') };
            const args = { first: 1, offset: 2 };

            const result = await flections(parent, args, context);

            const copy = copyObject(result, { replaceUUIDs: true });
            expect(copy).toEqual([
                {
                    id: '(ID:noun-flection3)',
                    name_de: 'Plural, unbestimmt',
                    pos: 2,
                },
            ]);
        });
    });
}

function runTestsAboutFlectionWithWordClass() {
    describe(`has an ${ASYNC} function ${bold('Flection.wordClass()')} which`, () => {
        const { wordClass } = resolvers.Flection;

        it(IS_ACCESSIBLE, () => expect(wordClass).toBeFunction());

        it(`${EXPECTS} three arguments (parent, args, context)`, () => expect(wordClass).toHaveLength(3));

        it(`- when used with flection-ID in "parent" - ${RESOLVES} as expected`, async () => {
            const parent = { id: getUUID('noun-flection3') };
            const args = null;

            const result = await wordClass(parent, args, context);

            const copy = copyObject(result, { replaceUUIDs: true });
            expect(copy).toEqual({
                id: '(ID:noun)',
                name_de: 'Substantiv',
            });
        });
    });
}
