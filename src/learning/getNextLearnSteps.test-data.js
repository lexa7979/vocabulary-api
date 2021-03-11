const { getUUID, getTimestampBeforeNow } = require('../utils/dummyData');

const DB_MOCKUP_USERNAME = 'user1';
const DB_MOCKUP_USERID = getUUID(DB_MOCKUP_USERNAME);

module.exports = {
  DB_MOCKUP_USERID,

  DbMockup: {
    getWordWithTranslations,
    getUser,
    listAllActiveWordsOfUser,
  },
};

async function getWordWithTranslations(wordId) {
  const testWords = [
    _fakeWordWithTranslations('word1', _range(4)),
    _fakeWordWithTranslations('word2', _range(4)),
    _fakeWordWithTranslations('word3', _range(4)),
    _fakeWordWithTranslations('word4', _range(4)),
    _fakeWordWithTranslations('word5', _range(4)),
    _fakeWordWithTranslations('word6', _range(4)),
    _fakeWordWithTranslations('word7', _range(4)),
    _fakeWordWithTranslations('word8', _range(4)),
    _fakeWordWithTranslations('word9', _range(4)),
    _fakeWordWithTranslations('word10', _range(4)),
    _fakeWordWithTranslations('word11', _range(4)),
    _fakeWordWithTranslations('word12', _range(4)),
    _fakeWordWithTranslations('word13', _range(4)),
    _fakeWordWithTranslations('word14', _range(4)),
    _fakeWordWithTranslations('word15', _range(4)),
    _fakeWordWithTranslations('word16', _range(4)),
    _fakeWordWithTranslations('word17', _range(4)),
    _fakeWordWithTranslations('word18', _range(4)),
    _fakeWordWithTranslations('word19', _range(4)),
    _fakeWordWithTranslations('word20', _range(4)),
  ];

  const result = testWords.filter(item => item.id === wordId)[0];
  if (result == null) {
    throw new Error('DbMockup.getWordWithTranslations() failed - invalid word-ID');
  }
  return result;
}

async function getUser(userId) {
  if (userId !== DB_MOCKUP_USERID) {
    throw new Error('DbMockup.getUser() failed - invalid user-ID');
  }
  return {
    id: DB_MOCKUP_USERID,
    currStep: 11,
    learnPath: [
      _fakeLearnStep(1, 'word1', 'flection1'),
      _fakeLearnStep(2, 'word2', 'flection1'),
      _fakeLearnStep(3, 'word3', 'flection1'),
      _fakeLearnStep(4, 'word4', 'flection1'),
      _fakeLearnStep(5, 'word5', 'flection1'),
      _fakeLearnStep(6, 'word6', 'flection1'),
      _fakeLearnStep(7, 'word7', 'flection1'),
      _fakeLearnStep(8, 'word8', 'flection1'),
      _fakeLearnStep(9, 'word9', 'flection1'),
      _fakeLearnStep(10, 'word10', 'flection1'),
      _fakeLearnStep(11, 'word11', 'flection1'),
      _fakeLearnStep(12, 'word12', 'flection1'),
      _fakeLearnStep(13, 'word13', 'flection1'),
    ],
  };
}

async function listAllActiveWordsOfUser(userId) {
  if (userId !== DB_MOCKUP_USERID) {
    throw new Error('DbMockup.listAllActiveWordsOfUser() failed - invalid user-ID');
  }
  return [
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word1', 1, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word2', 2, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word3', 3, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word4', 4, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word5', 5, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word6', 6, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word7', 7, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word8', 8, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word9', 9, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word10', 10, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word11', 11, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word12', 12, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word13', 13, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word14', 14, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word15', 15, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word16', 16, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
    _fakeActiveWord(DB_MOCKUP_USERNAME, 'word17', 17, [
      [1, 0, { days: 4 }],
      [2, 1, { days: 5 }],
      [3, 2, { days: 6 }],
      [4, 3, { days: 7 }],
    ]),
  ];
}

function _range(count) {
  const result = [];
  for (let i = 1; i <= count; i += 1) {
    result.push(i);
  }
  return result;
}

function _fakeWordWithTranslations(wordName, flectionSuffixes) {
  const wordId = getUUID(wordName);
  return {
    id: wordId,
    translations: flectionSuffixes.map((suffix, index) => ({
      id: getUUID(`translation${index + 1}`),
      wordId: getUUID(wordName),
      flectionId: getUUID(`flection${suffix}`),
      text_de: `${wordName}-flection${suffix}-de`,
      text_sv: `${wordName}-flection${suffix}-sv`,
    })),
  };
}

function _fakeLearnStep(step, wordName, flectionName) {
  return {
    step,
    wordId: getUUID(wordName),
    flectionId: getUUID(flectionName),
    result: 79,
  };
}

function _fakeActiveWord(userName, wordName, index, listOfFlectionsWithGroupAndAge) {
  return {
    id: getUUID(`${userName}-activeWord${index}`),
    userId: getUUID(userName),
    wordId: getUUID(wordName),
    learnProgress: listOfFlectionsWithGroupAndAge.map(([suffix, currGroup, age]) => ({
      flectionId: getUUID(`flection${suffix}`),
      currGroup,
      changedAt: getTimestampBeforeNow(age),
    })),
  };
}
