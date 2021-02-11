const getTestId = require('./getTestId');

module.exports = {
  getActiveWord,
  listAllActiveWordsOfUser,
};

const allActiveWords = [
  {
    id: getTestId('user1-activeWord1'),
    userId: getTestId('user1'),
    wordId: getTestId('word1'),
    learnProgress: [
      {
        flectionId: getTestId('verb-flection1'),
        success: 0,
        failure: 0,
        lastStep: null,
        lastResult: null,
        lastTimestamp: null,
      },
      {
        flectionId: getTestId('verb-flection2'),
        success: 0,
        failure: 0,
        lastStep: null,
        lastResult: null,
        lastTimestamp: null,
      },
      {
        flectionId: getTestId('verb-flection3'),
        success: 0,
        failure: 0,
        lastStep: null,
        lastResult: null,
        lastTimestamp: null,
      },
      {
        flectionId: getTestId('verb-flection4'),
        success: 0,
        failure: 0,
        lastStep: null,
        lastResult: null,
        lastTimestamp: null,
      },
      {
        flectionId: getTestId('verb-flection5'),
        success: 0,
        failure: 0,
        lastStep: null,
        lastResult: null,
        lastTimestamp: null,
      },
    ],
  },
  {
    id: getTestId('user1-activeWord2'),
    userId: getTestId('user1'),
    wordId: getTestId('word3'),
    learnProgress: [
      {
        flectionId: getTestId('adjective-flection1'),
        success: 0,
        failure: 0,
        lastStep: null,
        lastResult: null,
        lastTimestamp: null,
      },
      {
        flectionId: getTestId('adjective-flection2'),
        success: 0,
        failure: 0,
        lastStep: null,
        lastResult: null,
        lastTimestamp: null,
      },
      {
        flectionId: getTestId('adjective-flection3'),
        success: 0,
        failure: 0,
        lastStep: null,
        lastResult: null,
        lastTimestamp: null,
      },
      {
        flectionId: getTestId('adjective-flection4'),
        success: 0,
        failure: 0,
        lastStep: null,
        lastResult: null,
        lastTimestamp: null,
      },
      {
        flectionId: getTestId('adjective-flection5'),
        success: 0,
        failure: 0,
        lastStep: null,
        lastResult: null,
        lastTimestamp: null,
      },
      {
        flectionId: getTestId('adjective-flection6'),
        success: 0,
        failure: 0,
        lastStep: null,
        lastResult: null,
        lastTimestamp: null,
      },
    ],
  },
];

async function getActiveWord(id) {
  const activeWord = allActiveWords.filter(item => item.id === id)[0];
  if (activeWord == null) {
    throw new Error(`getActiveWord() failed - invalid ID (${id})`);
  }
  return activeWord;
}

async function listAllActiveWordsOfUser(userId, first, offset) {
  const list = allActiveWords
    .filter(item => item.userId === userId)
    .slice(offset, first ? offset + first : undefined);

  const results = list.map(activeWord => ({ ...activeWord }));
  return results;
}
