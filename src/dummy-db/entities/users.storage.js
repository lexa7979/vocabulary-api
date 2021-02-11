const getTestId = require('../getTestId');

const allUsers = [
  {
    id: getTestId('user1'),
    login: 'user1',
    name: 'User 1',
    currStep: 8,
    learnPath: [
      {
        step: 7,
        wordId: getTestId('word3'),
        flection: getTestId('adjective-flection2'),
        result: 100,
      },
      {
        step: 8,
        wordId: getTestId('word1'),
        flection: getTestId('verb-flection4'),
      },
    ],
  },
  {
    id: getTestId('user2'),
    login: 'user2',
    name: 'User 2',
    currStep: 0,
  },
];

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

module.exports = {
  allUsers,
  allActiveWords,
};
