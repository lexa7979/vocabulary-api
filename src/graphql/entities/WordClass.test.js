const db = require('../../dummy-db');
const { getTestId, _testHelpers: TestIdHelpers } = require('../../dummy-db/testIds');

const { resolvers } = require('./WordClass');

const { bold, RESOLVES, ASYNC, IS_ACCESSIBLE, EXPECTS } = require('../../../test');

const context = { db };

describe(`GraphQL entity WordClass`, () => {
  it(`has all expected resolvers`, () => {
    expect(resolvers).toMatchInlineSnapshot(`
      Object {
        "Flection": Object {
          "wordClass": [Function],
        },
        "Query": Object {
          "wordClass": [Function],
          "wordClasses": [Function],
        },
        "WordClass": Object {
          "flections": [Function],
        },
      }
    `);
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

    it(`${EXPECTS} three arguments (parent, args, context)`, () =>
      expect(wordClass).toHaveLength(3));

    it(`- when used with class-ID in "args" - ${RESOLVES} as expected`, async () => {
      const parent = null;
      const args = { id: getTestId('noun') };

      const result = await wordClass(parent, args, context);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchInlineSnapshot(`
        Object {
          "id": "(ID:noun)",
          "name_de": "Substantiv",
        }
      `);
    });
  });
}

function runTestsAboutQueryWithWordClasses() {
  describe(`has an ${ASYNC} function ${bold('Query.wordClasses()')} which`, () => {
    const { wordClasses } = resolvers.Query;

    it(IS_ACCESSIBLE, () => expect(wordClasses).toBeFunction());

    it(`${EXPECTS} three arguments (parent, args, context)`, () =>
      expect(wordClasses).toHaveLength(3));

    it(`- when used with "first" and "offset" in "args" - ${RESOLVES} as expected`, async () => {
      const parent = null;
      const args = { first: 2, offset: 1 };

      const result = await wordClasses(parent, args, context);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchInlineSnapshot(`
        Array [
          Object {
            "id": "(ID:noun)",
            "name_de": "Substantiv",
          },
          Object {
            "id": "(ID:adjective)",
            "name_de": "Adjektiv",
          },
        ]
      `);
    });
  });
}

function runTestsAboutWordClassWithFlections() {
  describe(`has an ${ASYNC} function ${bold('WordClass.flections()')} which`, () => {
    const { flections } = resolvers.WordClass;

    it(IS_ACCESSIBLE, () => expect(flections).toBeFunction());

    it(`${EXPECTS} three arguments (parent, args, context)`, () =>
      expect(flections).toHaveLength(3));

    it(`- when used with class-ID in "parent", "first" and "offset" in "args" - ${RESOLVES} as expected`, async () => {
      const parent = { id: getTestId('noun') };
      const args = { first: 1, offset: 2 };

      const result = await flections(parent, args, context);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchInlineSnapshot(`
        Array [
          Object {
            "id": "(ID:noun-flection3)",
            "name_de": "Plural, unbestimmt",
            "pos": 2,
          },
        ]
      `);
    });
  });
}

function runTestsAboutFlectionWithWordClass() {
  describe(`has an ${ASYNC} function ${bold('Flection.wordClass()')} which`, () => {
    const { wordClass } = resolvers.Flection;

    it(IS_ACCESSIBLE, () => expect(wordClass).toBeFunction());

    it(`${EXPECTS} three arguments (parent, args, context)`, () =>
      expect(wordClass).toHaveLength(3));

    it(`- when used with flection-ID in "parent" - ${RESOLVES} as expected`, async () => {
      const parent = { id: getTestId('noun-flection3') };
      const args = null;

      const result = await wordClass(parent, args, context);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchInlineSnapshot(`
        Object {
          "id": "(ID:noun)",
          "name_de": "Substantiv",
        }
      `);
    });
  });
}
