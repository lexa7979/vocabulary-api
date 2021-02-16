const { getTestId, _testHelpers: TestIdHelpers } = require('../testIds');

const WordClasses = require('./wordClasses');

const { ASYNC, bold, EXPECTS, IS_ACCESSIBLE, REJECTS, RESOLVES } = require('../../../test');

const Global = {};

describe('Test-data service "WordClasses"', () => {
  it(`has the expected exports`, () => {
    expect(WordClasses).toMatchInlineSnapshot(`
      Object {
        "getFlection": [Function],
        "getWordClass": [Function],
        "getWordClassWithFlections": [Function],
        "listAllFlectionsOfWordClass": [Function],
        "listAllWordClasses": [Function],
      }
    `);
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
      const wordClass = await getWordClass(getTestId('verb'));

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(wordClass);
      expect(copy).toMatchSnapshot('> word-class "verb" <');
    });
  });
}

function runTestsAboutGetWordClassWithFlections() {
  describe(`${_nextListHint()} has an ${ASYNC} function ${bold(
    'getWordClassWithFlections()'
  )} which`, () => {
    const { getWordClassWithFlections } = WordClasses;

    it(IS_ACCESSIBLE, () => expect(getWordClassWithFlections).toBeFunction());

    it(`${EXPECTS} one argument (classId)`, () => expect(getWordClassWithFlections.length).toBe(1));

    it(`- when used w/o arguments - ${REJECTS} as expected`, async () => {
      await expect(getWordClassWithFlections).rejects.toThrow('invalid ID');
    });

    it(`- when used with valid ID - ${RESOLVES} with expected data ${_nextSnapshotHint()}`, async () => {
      const wordClass = await getWordClassWithFlections(getTestId('verb'));

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(wordClass);
      expect(copy).toMatchSnapshot('> word-class "verb" + flections <');
    });
  });
}

function runTestsAboutListAllWordClasses() {
  describe(`${_nextListHint()} has an ${ASYNC} function ${bold(
    'listAllWordClassIds()'
  )} which`, () => {
    const { listAllWordClasses } = WordClasses;

    it(IS_ACCESSIBLE, () => expect(listAllWordClasses).toBeFunction());

    it(`${EXPECTS} no arguments`, () => expect(listAllWordClasses).toHaveLength(0));

    it(`- when used w/o arguments - ${RESOLVES} with expected data ${_nextSnapshotHint()}`, async () => {
      const wordClasses = await listAllWordClasses();

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(wordClasses);
      expect(copy).toMatchSnapshot('> all word-classes <');
    });

    it(`- when used with argument "first" - ${RESOLVES} with expected data`, async () => {
      const wordClasses = await listAllWordClasses(1, undefined);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(wordClasses);
      expect(copy.map(({ id }) => id)).toMatchInlineSnapshot(`
        Array [
          "(ID:verb)",
        ]
      `);
    });

    it(`- when used with argument "offset" - ${RESOLVES} with expected data`, async () => {
      const wordClasses = await listAllWordClasses(undefined, 1);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(wordClasses);
      expect(copy.map(({ id }) => id)).toMatchInlineSnapshot(`
        Array [
          "(ID:noun)",
          "(ID:adjective)",
        ]
      `);
    });

    it(`- when used with arguments "first" and "offset" - ${RESOLVES} with expected data`, async () => {
      const wordClasses = await listAllWordClasses(1, 1);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(wordClasses);
      expect(copy.map(({ id }) => id)).toMatchInlineSnapshot(`
        Array [
          "(ID:noun)",
        ]
      `);
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
      const flection = await getFlection(getTestId('noun-flection3'));

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(flection);
      expect(copy).toMatchSnapshot('> 3rd flection of word-class "noun" <');
    });
  });
}

function runTestsAboutListAllFlectionsOfWordClass() {
  describe(`${_nextListHint()} has an ${ASYNC} function ${bold(
    'listAllFlectionsOfWordClass()'
  )} which`, () => {
    const { listAllFlectionsOfWordClass } = WordClasses;

    it(IS_ACCESSIBLE, () => expect(listAllFlectionsOfWordClass).toBeFunction());

    it(`${EXPECTS} one argument (classId)`, () =>
      expect(listAllFlectionsOfWordClass).toHaveLength(1));

    it(`- when used w/o arguments - ${RESOLVES} with an empty array`, async () => {
      const result = await listAllFlectionsOfWordClass();
      expect(result).toEqual([]);
    });

    it(`- when used with valid ID - ${RESOLVES} with expected data ${_nextSnapshotHint()}`, async () => {
      const flections = await listAllFlectionsOfWordClass(getTestId('noun'));

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(flections);
      expect(copy).toMatchSnapshot('> all flections of word-class "noun" <');
    });

    it(`- when used with valid ID and argument "first" - ${RESOLVES} with expected data`, async () => {
      const result = await listAllFlectionsOfWordClass(getTestId('noun'), 2, undefined);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy.map(({ id }) => id)).toMatchInlineSnapshot(`
        Array [
          "(ID:noun-flection1)",
          "(ID:noun-flection2)",
        ]
      `);
    });

    it(`- when used with valid ID and argument "offset" - ${RESOLVES} with expected data`, async () => {
      const result = await listAllFlectionsOfWordClass(getTestId('noun'), undefined, 1);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy.map(({ id }) => id)).toMatchInlineSnapshot(`
        Array [
          "(ID:noun-flection2)",
          "(ID:noun-flection3)",
          "(ID:noun-flection4)",
        ]
      `);
    });

    it(`- when used with valid ID, arguments "first" and "offset" - ${RESOLVES} with expected data`, async () => {
      const result = await listAllFlectionsOfWordClass(getTestId('noun'), 2, 1);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy.map(({ id }) => id)).toMatchInlineSnapshot(`
        Array [
          "(ID:noun-flection2)",
          "(ID:noun-flection3)",
        ]
      `);
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
