const db = require('../../dummy-db');
const { getTestId, _testHelpers: TestIdHelpers } = require('../../dummy-db/testIds');

const { resolvers } = require('./Word');

const { bold, RESOLVES, ASYNC, IS_ACCESSIBLE, EXPECTS } = require('../../../test');

const context = { db };

describe(`GraphQL entity ${bold('Word')}`, () => {
  it(`has all expected resolvers`, () => {
    expect(resolvers).toMatchInlineSnapshot(`
      Object {
        "Query": Object {
          "word": [Function],
          "words": [Function],
        },
        "Translation": Object {
          "flection": [Function],
          "word": [Function],
        },
        "Word": Object {
          "translations": [Function],
          "wordClass": [Function],
        },
      }
    `);
  });

  runTestsAboutQueryWithWord();
  runTestsAboutQueryWithWords();

  runTestsAboutWordWithWordClass();
  runTestsAboutWordWithTranslations();

  runTestsAboutTranslationWithFlection();
  runTestsAboutTranslationWithWord();
});

function runTestsAboutQueryWithWord() {
  describe(`has an ${ASYNC} function ${bold('Query.word()')} which`, () => {
    const { word } = resolvers.Query;

    it(IS_ACCESSIBLE, () => expect(word).toBeFunction());

    it(`${EXPECTS} three arguments (parent, args, context)`, () => expect(word).toHaveLength(3));

    it(`- when used with word-ID in "args" - ${RESOLVES} as expected`, async () => {
      const parent = null;
      const args = { id: getTestId('word3') };

      const result = await word(parent, args, context);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchInlineSnapshot(`
        Object {
          "id": "(ID:word3)",
        }
      `);
    });
  });
}

function runTestsAboutQueryWithWords() {
  describe(`has an ${ASYNC} function ${bold('Query.words()')} which`, () => {
    const { words } = resolvers.Query;

    it(IS_ACCESSIBLE, () => expect(words).toBeFunction());

    it(`${EXPECTS} three arguments (parent, args, context)`, () => expect(words).toHaveLength(3));

    it(`- when used with "first" and "offset" in "args" - ${RESOLVES} as expected`, async () => {
      const parent = null;
      const args = { first: 2, offset: 1 };

      const result = await words(parent, args, context);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchInlineSnapshot(`
        Array [
          Object {
            "id": "(ID:word2)",
          },
          Object {
            "id": "(ID:word3)",
          },
        ]
      `);
    });
  });
}

function runTestsAboutWordWithWordClass() {
  describe(`has an ${ASYNC} function ${bold('Word.wordClass()')} which`, () => {
    const { wordClass } = resolvers.Word;

    it(IS_ACCESSIBLE, () => expect(wordClass).toBeFunction());

    it(`${EXPECTS} three arguments (parent, args, context)`, () =>
      expect(wordClass).toHaveLength(3));

    it(`- when used with word-ID in "parent" - ${RESOLVES} as expected`, async () => {
      const parent = { id: getTestId('word1') };
      const args = null;

      const result = await wordClass(parent, args, context);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchInlineSnapshot(`
        Object {
          "id": "(ID:verb)",
          "name_de": "Verb",
        }
      `);
    });
  });
}

function runTestsAboutWordWithTranslations() {
  describe(`has an ${ASYNC} function ${bold('Word.translations()')} which`, () => {
    const { translations } = resolvers.Word;

    it(IS_ACCESSIBLE, () => expect(translations).toBeFunction());

    it(`${EXPECTS} three arguments (parent, args, context)`, () =>
      expect(translations).toHaveLength(3));

    it(`- when used with word-ID in "parent", "first" and "offset" in "args" - ${RESOLVES} as expected`, async () => {
      const parent = { id: getTestId('word1') };
      const args = { first: 3, offset: 2 };

      const result = await translations(parent, args, context);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchInlineSnapshot(`
        Array [
          Object {
            "id": "(ID:word1-translation3)",
            "text_de": "sie geht",
            "text_sv": "hon går",
          },
          Object {
            "id": "(ID:word1-translation4)",
            "text_de": "wir gehen",
            "text_sv": "vi går",
          },
          Object {
            "id": "(ID:word1-translation5)",
            "text_de": "er ging",
            "text_sv": "han gick",
          },
        ]
      `);
    });
  });
}

function runTestsAboutTranslationWithFlection() {
  describe(`has an ${ASYNC} function ${bold('Translation.flection()')} which`, () => {
    const { flection } = resolvers.Translation;

    it(IS_ACCESSIBLE, () => expect(flection).toBeFunction());

    it(`${EXPECTS} three arguments (parent, args, context)`, () =>
      expect(flection).toHaveLength(3));

    it(`- when used with translation-ID in "parent" - ${RESOLVES} as expected`, async () => {
      const parent = { id: getTestId('word1-translation3') };
      const args = null;

      const result = await flection(parent, args, context);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchInlineSnapshot(`
        Object {
          "id": "(ID:verb-flection2)",
          "name_de": "Präsens",
          "pos": 1,
        }
      `);
    });
  });
}

function runTestsAboutTranslationWithWord() {
  describe(`has an ${ASYNC} function ${bold('Translation.word()')} which`, () => {
    const { word } = resolvers.Translation;

    it(IS_ACCESSIBLE, () => expect(word).toBeFunction());

    it(`${EXPECTS} three arguments (parent, args, context)`, () => expect(word).toHaveLength(3));

    it(`- when used with translation-ID in "parent" - ${RESOLVES} as expected`, async () => {
      const parent = { id: getTestId('word1-translation3') };
      const args = null;

      const result = await word(parent, args, context);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchInlineSnapshot(`
        Object {
          "id": "(ID:word1)",
        }
      `);
    });
  });
}
