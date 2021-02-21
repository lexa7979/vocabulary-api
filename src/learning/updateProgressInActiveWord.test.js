const { detailedDiff } = require('deep-object-diff');

const { getTestId, _testHelpers: TestIdHelpers } = require('../dummy-db/testIds');

const updateProgressInActiveWord = require('./updateProgressInActiveWord');

const { bold, EXPECTS, FAILS, IS_ACCESSIBLE, RETURNS, WORKS } = require('../../test');

const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;

function _copy(obj) {
  return TestIdHelpers.copyObjectButReplaceUUIDs(_copyObjectButReplaceTimestamps(obj));
}

describe(`Learning utility function ${bold('updateProgressInActiveWord()')}`, () => {
  it(IS_ACCESSIBLE, () => expect(updateProgressInActiveWord).toBeFunction());

  it(`${EXPECTS} two arguments (activeWord, newResult)`, () =>
    expect(updateProgressInActiveWord).toHaveLength(2));

  it(`- when given "activeWord" and "newResult" - ${RETURNS} an updated "activeWord"`, () => {
    const activeWord = _getTestActiveWord();
    const newResult = {
      flectionId: getTestId('verb-flection2'),
      correctness: 100,
    };

    const updated = updateProgressInActiveWord(activeWord, newResult);

    expect(detailedDiff(_copy(activeWord), _copy(updated))).toMatchInlineSnapshot(`
      Object {
        "added": Object {
          "learnProgress": Object {
            "3": Object {
              "changedAt": "(TS:today)",
              "currGroup": 1,
              "flectionId": "(ID:verb-flection2)",
            },
          },
        },
        "deleted": Object {},
        "updated": Object {},
      }
    `);
  });

  const testSituations = [
    { oldGroup: null, correctness: 0, newGroup: 0 },
    { oldGroup: null, correctness: 50, newGroup: 0 },
    { oldGroup: null, correctness: 100, newGroup: 1 },
    { oldGroup: 0, correctness: 0, newGroup: 0 },
    { oldGroup: 0, correctness: 50, newGroup: 0 },
    { oldGroup: 0, correctness: 100, newGroup: 1 },
    { oldGroup: 1, correctness: 0, newGroup: 0 },
    { oldGroup: 1, correctness: 50, newGroup: 1 },
    { oldGroup: 1, correctness: 100, newGroup: 2 },
    { oldGroup: 2, correctness: 0, newGroup: 0 },
    { oldGroup: 2, correctness: 50, newGroup: 2 },
    { oldGroup: 2, correctness: 100, newGroup: 3 },
    { oldGroup: 3, correctness: 0, newGroup: 0 },
    { oldGroup: 3, correctness: 50, newGroup: 3 },
    { oldGroup: 3, correctness: 100, newGroup: 4 },
    { oldGroup: 4, correctness: 0, newGroup: 0 },
    { oldGroup: 4, correctness: 50, newGroup: 4 },
    { oldGroup: 4, correctness: 100, newGroup: 5 },
    { oldGroup: 5, correctness: 0, newGroup: 0 },
    { oldGroup: 5, correctness: 50, newGroup: 5 },
    { oldGroup: 5, correctness: 100, newGroup: 5 },
  ];

  const testRunsWithoutOldResult = testSituations
    .filter(item => item.oldGroup == null)
    .map(item => [item.correctness, item.newGroup]);
  it.each(testRunsWithoutOldResult)(
    `- when flection has no old result and correctness is %d - ${WORKS} as expected`,
    (correctness, newGroup) => {
      const activeWord = _getTestActiveWord([]);
      const newResult = {
        flectionId: getTestId('verb-flection2'),
        correctness,
      };

      const updated = updateProgressInActiveWord(activeWord, newResult);

      const newLearnProgress = _copy(updated).learnProgress;
      expect(newLearnProgress).toEqual([
        {
          flectionId: '(ID:verb-flection2)',
          currGroup: newGroup,
          changedAt: '(TS:today)',
        },
      ]);
    }
  );

  const testRunsWithOldResult = testSituations
    .filter(item => item.oldGroup != null)
    .map(item => [item.oldGroup, item.correctness, item.newGroup]);
  it.each(testRunsWithOldResult)(
    `- when flection has old result with group %d and correctness is %d - ${WORKS} as expected`,
    (oldGroup, correctness, newGroup) => {
      const activeWord = _getTestActiveWord([
        {
          flectionId: getTestId('verb-flection2'),
          currGroup: oldGroup,
          changedAt: _getTestTimestampBeforeNow({ days: 3 }),
        },
      ]);
      const newResult = {
        flectionId: getTestId('verb-flection2'),
        correctness,
      };

      const updated = updateProgressInActiveWord(activeWord, newResult);

      const newLearnProgress = _copy(updated).learnProgress;
      expect(newLearnProgress).toEqual([
        {
          flectionId: '(ID:verb-flection2)',
          currGroup: newGroup,
          changedAt: '(TS:today)',
        },
      ]);
    }
  );

  it(`- when flection has old result with invalid group - ${FAILS} as expected`, () => {
    const activeWord = _getTestActiveWord([
      {
        flectionId: getTestId('verb-flection2'),
        currGroup: 6,
        changedAt: _getTestTimestampBeforeNow({ days: 3 }),
      },
    ]);
    const newResult = { flectionId: getTestId('verb-flection2'), correctness: 100 };

    expect(() => updateProgressInActiveWord(activeWord, newResult)).toThrow('invalid group');
  });
});

function _getTestActiveWord(learnProgress) {
  const defaultLearnProgress = [
    {
      flectionId: getTestId('verb-flection1'),
      currGroup: 3,
      changedAt: _getTestTimestampBeforeNow({ days: 3 }),
    },
    {
      flectionId: getTestId('verb-flection4'),
      currGroup: 1,
      changedAt: _getTestTimestampBeforeNow({ days: 9 }),
    },
    {
      flectionId: getTestId('verb-flection5'),
      currGroup: 0,
      changedAt: _getTestTimestampBeforeNow({ days: 1 }),
    },
  ];
  const activeWord = {
    id: getTestId('user1-activeWord1'),
    userId: getTestId('user1'),
    wordId: getTestId('word1'),
    learnProgress: learnProgress != null ? learnProgress : defaultLearnProgress,
  };
  return activeWord;
}

/**
 * @param {{minutes?: number, hours?: number, days?: number}} inputBag
 * @returns {number}
 */
function _getTestTimestampBeforeNow({ minutes = 0, hours = 0, days = 0 }) {
  const now = new Date().getTime();
  const result = now - minutes * ONE_MINUTE - hours * ONE_HOUR - days * ONE_DAY;
  return result;
}

/**
 * @param {*} input
 * @returns {*}
 */
function _copyObjectButReplaceTimestamps(input) {
  const _recursion = obj => {
    if (obj == null || typeof obj !== 'object') {
      if (typeof obj === 'number') {
        const now = new Date().getTime();
        const days = Math.floor((now - obj) / ONE_DAY);
        if (days === 0 || days === 1) {
          return days === 0 ? '(TS:today)' : '(TS:yesterday)';
        }
        if (days > 1 && days <= 100) {
          return `(TS:-${days}days)`;
        }
      }
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(_recursion);
    }
    const result = {};
    Object.keys(obj).forEach(key => {
      result[key] = _recursion(obj[key]);
    });
    return result;
  };
  return _recursion(input);
}
