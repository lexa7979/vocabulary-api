const { getUUID } = require('../../utils/dummyData');

const _getLearnPathItem = (step, wordIdKey, flectionIdKey, result) => {
  const wordId = getUUID(wordIdKey);
  const flectionId = getUUID(flectionIdKey);
  return { step, wordId, flectionId, result };
};

const allUsers = [
  {
    id: getUUID('user1'),
    login: 'user1',
    name: 'User 1',
    currStep: 8,
    learnPath: [
      _getLearnPathItem(7, 'word3', 'adjective-flection2', 100),
      _getLearnPathItem(8, 'word1', 'verb-flection4', null),
    ],
  },
  {
    id: getUUID('user2'),
    login: 'user2',
    name: 'User 2',
    currStep: 0,
  },
];

const _getLearnProgress = (getFlectionKey, ...dataOfSingleFlections) =>
  dataOfSingleFlections.map(([success, failure, lastStep, lastResult, lastTimestamp], index) => {
    const flectionId = getUUID(getFlectionKey(index + 1));
    return { flectionId, success, failure, lastStep, lastResult, lastTimestamp };
  });

const allActiveWords = [
  {
    id: getUUID('user1-activeWord1'),
    userId: getUUID('user1'),
    wordId: getUUID('word1'),
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
    id: getUUID('user1-activeWord2'),
    userId: getUUID('user1'),
    wordId: getUUID('word3'),
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
