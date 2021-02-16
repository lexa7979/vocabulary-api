const { gql } = require('apollo-server');

module.exports = {
  typeDefs: getTypeDefs(),
  resolvers: getResolvers(),
};

/**
 * @returns {object}
 */
function getTypeDefs() {
  return gql`
    type Query {
      user(id: UUID): User
      users(first: Int = 0, offset: Int = 0): [User!]!
    }

    type User {
      id: UUID!
      login: String!
      name: String

      activeWords(first: Int = 0, offset: Int = 0): [Word!]!
    }
  `;
}

/**
 * @returns {object}
 */
function getResolvers() {
  return {
    Query: {
      user,
      users,
    },

    User: {
      activeWords: activeWordsOfUser,
    },
  };
}

/**
 * @param {object} parent
 * @param {{ id: string }} args
 * @param {{ db: object }} context
 *
 * @throws
 * @returns {Promise<object>}
 */
async function user(parent, { id }, { db }) {
  const { login, name, currStep } = await db.getUser(id);
  return {
    id,
    login,
    name,
    currStep,
  };
}

/**
 * @param {object} parent
 * @param {{ first: number, offset: number}} args
 * @param {{ db: object }} context
 *
 * @throws
 * @returns {Promise<object[]>}
 */
async function users(parent, { first, offset }, { db }) {
  const list = await db.listAllUsers(first, offset);
  const results = list.map(({ id, login, name }) => ({
    id,
    login,
    name,
  }));
  return results;
}

/**
 * @param {{ id: string }} parent
 * @param {{ first: number, offset: number }} args
 * @param {{ db: object }} context
 *
 * @throws
 * @returns {Promise<object[]>}
 */
async function activeWordsOfUser({ id: userId }, { first, offset }, { db }) {
  const list = await db.listAllActiveWordsOfUser(userId, first, offset);
  const results = await Promise.all(
    list.map(async ({ wordId: id }) => {
      await db.getWord(id);
      return {
        id,
      };
    })
  );
  return results;
}
