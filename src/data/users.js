const getTestId = require('./getTestId');

module.exports = {
  getUser,
  listAllUsers,
};

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
