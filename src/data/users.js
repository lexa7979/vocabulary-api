const getTestId = require('./getTestId');

module.exports = {
  getUser,
  listAllUsers,
};

const allUsers = [
  {
    id: getTestId('user1'),
    login: 'user1',
    currNumber: 8,
    activeWords: [
      {
        wordId: getTestId('word1'),
        currNumber: 10,
        currFlection: getTestId('verb-flection3'),
        statisticByFlection: {
          [getTestId('verb-flection1')]: { lastRunNumber: null, success: 0, failure: 0 },
          [getTestId('verb-flection2')]: { lastRunNumber: null, success: 0, failure: 0 },
          [getTestId('verb-flection3')]: { lastRunNumber: null, success: 0, failure: 0 },
          [getTestId('verb-flection4')]: { lastRunNumber: null, success: 0, failure: 0 },
          [getTestId('verb-flection5')]: { lastRunNumber: null, success: 0, failure: 0 },
        },
      },
      {
        wordId: getTestId('word3'),
        currNumber: 9,
        currFlection: getTestId('adjective-flection3'),
        statisticByFlection: {
          [getTestId('adjective-flection1')]: { lastRunNumber: null, success: 0, failure: 0 },
          [getTestId('adjective-flection2')]: { lastRunNumber: null, success: 0, failure: 0 },
          [getTestId('adjective-flection3')]: { lastRunNumber: null, success: 0, failure: 0 },
          [getTestId('adjective-flection4')]: { lastRunNumber: null, success: 0, failure: 0 },
          [getTestId('adjective-flection5')]: { lastRunNumber: null, success: 0, failure: 0 },
          [getTestId('adjective-flection6')]: { lastRunNumber: null, success: 0, failure: 0 },
        },
      },
    ],
  },
];

async function getUser(id) {
  const user = allUsers.filter(item => item.id === id)[0];
  if (user == null) {
    throw new Error(`getUser() failed - invalid ID (${id})`);
  }
  return { ...user };
}

async function listAllUsers(first = 0, offset = 0) {
  const list = allUsers.slice(offset, first ? offset + first : undefined);

  const results = list.map(user => ({ ...user }));
  return results;
}
