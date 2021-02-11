const { gql } = require('apollo-server');

module.exports = {
  typeDefs: getTypeDefs(),
  resolvers: getResolvers(),
};

function getTypeDefs() {
  const typeDefs = gql`
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
  return typeDefs;
}

function getResolvers() {
  const resolvers = {
    Query: {
      user: getUserById,
      users: listUsers,
    },

    User: {
      activeWords: getActiveWordsOfUser,
    },
  };
  return resolvers;
}

// eslint-disable-next-line no-unused-vars
async function getActiveWordsOfUser(parent, args, context, info) {
  const { id: userId } = parent;
  const { first, offset } = args;
  const { db } = context;

  const { activeWords } = await db.getUser(userId);
  const list = activeWords.slice(offset, first ? offset + first : undefined);

  const results = await Promise.all(
    list.map(item => db.getWord(item.wordId).then(() => item.wordId))
  );
  return results;
}

// eslint-disable-next-line no-unused-vars
async function getUserById(parent, args, context, info) {
  const { id } = args;
  const { db } = context;

  const { login, name, currStep } = await db.getUser(id);
  return { id, login, name, currStep };
}

// eslint-disable-next-line no-unused-vars
async function listUsers(parent, args, context, info) {
  const { first, offset } = args;
  const { db } = context;

  const list = await db.listAllUsers(first, offset);

  const results = list.map(item => ({ id: item.id, login: item.login, name: item.name }));
  return results;
}
