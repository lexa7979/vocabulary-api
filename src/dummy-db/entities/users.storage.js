const { getTestId } = require('../testIds');

const _getLearnPathItem = (step, wordIdKey, flectionIdKey, result) => {
  const wordId = getTestId(wordIdKey);
  const flectionId = getTestId(flectionIdKey);
  return { step, wordId, flectionId, result };
};

const allUsers = [
  {
    id: getTestId('user1'),
    login: 'user1',
    name: 'User 1',
    currStep: 8,
    learnPath: [
      _getLearnPathItem(7, 'word3', 'adjective-flection2', 100),
      _getLearnPathItem(8, 'word1', 'verb-flection4', null),
    ],
  },
  {
    id: getTestId('user2'),
    login: 'user2',
    name: 'User 2',
    currStep: 0,
  },
];

const _getLearnProgress = (getFlectionKey, ...dataOfSingleFlections) =>
  dataOfSingleFlections.map(([success, failure, lastStep, lastResult, lastTimestamp], index) => {
    const flectionId = getTestId(getFlectionKey(index + 1));
    return { flectionId, success, failure, lastStep, lastResult, lastTimestamp };
  });

const allActiveWords = [
  {
    id: getTestId('user1-activeWord1'),
    userId: getTestId('user1'),
    wordId: getTestId('word1'),
    learnProgress: _getLearnProgress(
      index => `verb-flection${index}`,
      [0, 0, null, null, null],
      [0, 0, null, null, null],
      [0, 0, null, null, null],
      [0, 0, null, null, null],
      [0, 0, null, null, null]
    ),
  },
  {
    id: getTestId('user1-activeWord2'),
    userId: getTestId('user1'),
    wordId: getTestId('word3'),
    learnProgress: _getLearnProgress(
      index => `adjective-flection${index}`,
      [0, 0, null, null, null],
      [0, 0, null, null, null],
      [0, 0, null, null, null],
      [0, 0, null, null, null],
      [0, 0, null, null, null],
      [0, 0, null, null, null]
    ),
  },
];

module.exports = {
  allUsers,
  allActiveWords,
};
