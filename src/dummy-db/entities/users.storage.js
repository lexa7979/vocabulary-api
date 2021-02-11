const getTestId = require('../getTestId');

const _getLearnPathItem = (step, wordIdKey, flectionIdKey, result) => ({
  step,
  wordId: getTestId(wordIdKey),
  flectionId: getTestId(flectionIdKey),
  result,
});

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

const _getProgressItem = (flectionIdKey, success, failure, lastStep, lastResult, lastTimestamp) => {
  const flectionId = getTestId(flectionIdKey);
  return {
    flectionId,
    success,
    failure,
    lastStep,
    lastResult,
    lastTimestamp,
  };
};

const allActiveWords = [
  {
    id: getTestId('user1-activeWord1'),
    userId: getTestId('user1'),
    wordId: getTestId('word1'),
    learnProgress: [
      _getProgressItem('verb-flection1', 0, 0, null, null, null),
      _getProgressItem('verb-flection2', 0, 0, null, null, null),
      _getProgressItem('verb-flection3', 0, 0, null, null, null),
      _getProgressItem('verb-flection4', 0, 0, null, null, null),
      _getProgressItem('verb-flection5', 0, 0, null, null, null),
    ],
  },
  {
    id: getTestId('user1-activeWord2'),
    userId: getTestId('user1'),
    wordId: getTestId('word3'),
    learnProgress: [
      _getProgressItem('adjective-flection1', 0, 0, null, null, null),
      _getProgressItem('adjective-flection2', 0, 0, null, null, null),
      _getProgressItem('adjective-flection3', 0, 0, null, null, null),
      _getProgressItem('adjective-flection4', 0, 0, null, null, null),
      _getProgressItem('adjective-flection5', 0, 0, null, null, null),
      _getProgressItem('adjective-flection6', 0, 0, null, null, null),
    ],
  },
];

module.exports = {
  allUsers,
  allActiveWords,
};
