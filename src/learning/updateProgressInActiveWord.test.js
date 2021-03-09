const { detailedDiff } = require('deep-object-diff');

const { getUUID, getTimestampBeforeNow } = require('../utils/dummyData');

const updateProgressInActiveWord = require('./updateProgressInActiveWord');

const { bold, EXPECTS, FAILS, IS_ACCESSIBLE, RETURNS, WORKS, copyObject } = require('../../test');

const _copy = input => copyObject(input, { replaceUUIDs: true, replaceTimestamps: true });

describe(`Learning utility function ${bold('updateProgressInActiveWord()')}`, () => {
  it(IS_ACCESSIBLE, () => expect(updateProgressInActiveWord).toBeFunction());

  it(`${EXPECTS} two arguments (activeWord, newResult)`, () =>
    expect(updateProgressInActiveWord).toHaveLength(2));

  it(`- when given "activeWord" and "newResult" - ${RETURNS} an updated "activeWord"`, () => {
    const activeWord = _getTestActiveWord();
    const newResult = {
      flectionId: getUUID('verb-flection2'),
      correctness: 100,
    };

    const updated = updateProgressInActiveWord(activeWord, newResult);

    expect(detailedDiff(_copy(activeWord), _copy(updated))).toMatchInlineSnapshot(`
      Object {
        "added": Object {
          "learnProgress": Object {
            "3": Object {
              "changedAt": "(TS:now)",
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
        flectionId: getUUID('verb-flection2'),
        correctness,
      };

      const updated = updateProgressInActiveWord(activeWord, newResult);

      const newLearnProgress = _copy(updated).learnProgress;
      expect(newLearnProgress).toEqual([
        {
          flectionId: '(ID:verb-flection2)',
          currGroup: newGroup,
          changedAt: '(TS:now)',
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
          flectionId: getUUID('verb-flection2'),
          currGroup: oldGroup,
          changedAt: getTimestampBeforeNow({ days: 3 }),
        },
      ]);
      const newResult = {
        flectionId: getUUID('verb-flection2'),
        correctness,
      };

      const updated = updateProgressInActiveWord(activeWord, newResult);

      const newLearnProgress = _copy(updated).learnProgress;
      expect(newLearnProgress).toEqual([
        {
          flectionId: '(ID:verb-flection2)',
          currGroup: newGroup,
          changedAt: '(TS:now)',
        },
      ]);
    }
  );

  it(`- when flection has old result with invalid group - ${FAILS} as expected`, () => {
    const activeWord = _getTestActiveWord([
      {
        flectionId: getUUID('verb-flection2'),
        currGroup: 6,
        changedAt: getTimestampBeforeNow({ days: 3 }),
      },
    ]);
    const newResult = { flectionId: getUUID('verb-flection2'), correctness: 100 };

    expect(() => updateProgressInActiveWord(activeWord, newResult)).toThrow('invalid group');
  });
});

function _getTestActiveWord(learnProgress) {
  const defaultLearnProgress = [
    {
      flectionId: getUUID('verb-flection1'),
      currGroup: 3,
      changedAt: getTimestampBeforeNow({ days: 3 }),
    },
    {
      flectionId: getUUID('verb-flection4'),
      currGroup: 1,
      changedAt: getTimestampBeforeNow({ days: 9 }),
    },
    {
      flectionId: getUUID('verb-flection5'),
      currGroup: 0,
      changedAt: getTimestampBeforeNow({ days: 1 }),
    },
  ];
  const activeWord = {
    id: getUUID('user1-activeWord1'),
    userId: getUUID('user1'),
    wordId: getUUID('word1'),
    learnProgress: learnProgress != null ? learnProgress : defaultLearnProgress,
  };
  return activeWord;
}
