const { getUUID, copyObjectButReplaceUUIDs } = require('../../utils/dummyData');

const Words = require('./words');

const { ASYNC, bold, EXPECTS, IS_ACCESSIBLE, REJECTS, RESOLVES } = require('../../../test');

const Global = {};

describe('Test-data service "words"', () => {
  it(`has the expected exports`, () => {
    expect(Words).toMatchInlineSnapshot(`
      Object {
        "getTranslation": [Function],
        "getWord": [Function],
        "getWordWithTranslations": [Function],
        "listAllTranslationsOfWord": [Function],
        "listAllWords": [Function],
      }
    `);
  });

  runTestsAboutGetWord();
  runTestsAboutGetWordWithTranslations();
  runTestsAboutListAllWords();

  runTestsAboutGetTranslation();
  runTestsAboutListAllTranslationsOfWord();
});

function runTestsAboutGetWord() {
  describe(`${_nextListHint()} has an ${ASYNC} function ${bold('getWord()')} which`, () => {
    const { getWord } = Words;

    it(IS_ACCESSIBLE, () => expect(getWord).toBeFunction());

    it(`${EXPECTS} one argument (wordId)`, () => expect(getWord).toHaveLength(1));

    it(`- when used w/o arguments - ${REJECTS} as expected`, () =>
      expect(getWord).rejects.toThrow('invalid ID'));

    it(`- when used with valid ID - ${RESOLVES} as expected ${_nextSnapshotHint()}`, async () => {
      const result = await getWord(getUUID('word1'));

      const copy = copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchSnapshot(`> word1 <`);
    });

    it(`- when used with invalid ID - ${REJECTS} as expected`, () =>
      expect(() => getWord(getUUID('invalid'))).rejects.toThrow('invalid ID'));
  });
}

function runTestsAboutGetWordWithTranslations() {
  describe(`${_nextListHint()} has an ${ASYNC} function ${bold(
    'getWordWithTranslations'
  )} which`, () => {
    const { getWordWithTranslations } = Words;

    it(IS_ACCESSIBLE, () => expect(getWordWithTranslations).toBeFunction());

    it(`${EXPECTS} one argument (wordId)`, () => expect(getWordWithTranslations).toHaveLength(1));

    it(`- when used w/o argument - ${REJECTS} as expected`, () =>
      expect(getWordWithTranslations).rejects.toThrow('invalid ID'));

    it(`- when used with valid ID - ${RESOLVES} as expected ${_nextSnapshotHint()}`, async () => {
      const result = await getWordWithTranslations(getUUID('word2'));

      const copy = copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchSnapshot(`> word2 + translations <`);
    });

    it(`- when used with invalid ID - ${REJECTS} as expected`, () =>
      expect(() => getWordWithTranslations(getUUID('invalid'))).rejects.toThrow('invalid ID'));
  });
}

function runTestsAboutListAllWords() {
  describe(`${_nextListHint()} has an ${ASYNC} function ${bold('listAllWords()')} which`, () => {
    const { listAllWords } = Words;

    it(IS_ACCESSIBLE, () => expect(listAllWords).toBeFunction());

    it(`${EXPECTS} no argument`, () => expect(listAllWords).toHaveLength(0));

    it(`- when used w/o arguments - ${RESOLVES} as expected ${_nextSnapshotHint()}`, async () => {
      const result = await listAllWords();

      const copy = copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchSnapshot(`> all words <`);
    });

    it(`- when used with argument "first" - ${RESOLVES} as expected`, async () => {
      const result = await listAllWords(4, undefined);

      const copy = copyObjectButReplaceUUIDs(result);
      expect(copy.map(({ id }) => id)).toMatchInlineSnapshot(`
        Array [
          "(ID:word1)",
          "(ID:word2)",
          "(ID:word3)",
          "(ID:word4)",
        ]
      `);
    });

    it(`- when used with argument "offset" - ${RESOLVES} as expected`, async () => {
      const result = await listAllWords(undefined, 8);

      const copy = copyObjectButReplaceUUIDs(result);
      expect(copy.map(({ id }) => id)).toMatchInlineSnapshot(`
        Array [
          "(ID:word9)",
          "(ID:word10)",
          "(ID:word11)",
          "(ID:word12)",
        ]
      `);
    });
  });
}

function runTestsAboutGetTranslation() {
  describe(`${_nextListHint()} has an ${ASYNC} function ${bold('getTranslation()')} which`, () => {
    const { getTranslation } = Words;

    it(IS_ACCESSIBLE, () => expect(getTranslation).toBeFunction());

    it(`${EXPECTS} one argument (translationId)`, () => expect(getTranslation).toHaveLength(1));

    it(`- when used w/o argument - ${REJECTS} as expected`, () =>
      expect(getTranslation).rejects.toThrow('invalid ID'));

    it(`- when used with valid ID - ${RESOLVES} as expected ${_nextSnapshotHint()}`, async () => {
      const result = await getTranslation(getUUID('word1-translation1'));

      const copy = copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchSnapshot(`> 1st translation of word1 <`);
    });

    it(`- when used with invalid ID - ${REJECTS} as expected`, () =>
      expect(() => getTranslation(getUUID('invalid'))).rejects.toThrow('invalid ID'));
  });
}

function runTestsAboutListAllTranslationsOfWord() {
  describe(`${_nextListHint()} has an ${ASYNC} function ${bold(
    'listAllTranslationsOfWord()'
  )} which`, () => {
    const { listAllTranslationsOfWord } = Words;

    it(IS_ACCESSIBLE, () => expect(listAllTranslationsOfWord).toBeFunction());

    it(`${EXPECTS} one argument (wordId)`, () => expect(listAllTranslationsOfWord).toHaveLength(1));

    it(`- when used w/o argument - ${RESOLVES} with empty array`, () =>
      expect(listAllTranslationsOfWord()).resolves.toEqual([]));

    it(`- when used with valid ID - ${RESOLVES} as expected ${_nextSnapshotHint()}`, async () => {
      const results = await listAllTranslationsOfWord(getUUID('word1'));

      const copy = copyObjectButReplaceUUIDs(results);
      expect(copy).toMatchSnapshot(`> all translations of word1 <`);
    });

    it(`- when used with valid ID and argument "first" - ${RESOLVES} as expected`, async () => {
      const result = await listAllTranslationsOfWord(getUUID('word1'), 3, undefined);

      const copy = copyObjectButReplaceUUIDs(result);
      expect(copy.map(({ id }) => id)).toMatchInlineSnapshot(`
        Array [
          "(ID:word1-translation1)",
          "(ID:word1-translation2)",
          "(ID:word1-translation3)",
        ]
      `);
    });

    it(`- when used with valid ID and argument "offset" - ${RESOLVES} as expected`, async () => {
      const result = await listAllTranslationsOfWord(getUUID('word1'), undefined, 3);

      const copy = copyObjectButReplaceUUIDs(result);
      expect(copy.map(({ id }) => id)).toMatchInlineSnapshot(`
        Array [
          "(ID:word1-translation4)",
          "(ID:word1-translation5)",
          "(ID:word1-translation6)",
          "(ID:word1-translation7)",
        ]
      `);
    });

    it(`- when used with invalid word-ID - ${RESOLVES} with empty array`, async () => {
      const result = await listAllTranslationsOfWord(getUUID('invalid'));

      expect(result).toEqual([]);
    });
  });
}

function _nextListHint() {
  Global.nextListItemId = Global.nextListItemId == null ? 1 : Global.nextListItemId + 1;
  return `(${Global.nextListItemId})`;
}

function _nextSnapshotHint() {
  Global.nextSnapshotId = Global.nextSnapshotId == null ? 1 : Global.nextSnapshotId + 1;
  return `[-> check snapshot ${Global.nextSnapshotId}]`;
}
