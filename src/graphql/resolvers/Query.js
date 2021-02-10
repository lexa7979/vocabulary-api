const Query = {
  wordClass: getWordClassById,
  wordClasses: listWordClasses,

  word: getWordById,
  words: listWords,

  user: getUserById,
  users: listUsers,
};

module.exports = Query;

// eslint-disable-next-line no-unused-vars
async function getWordClassById(parent, args, context, info) {
  const { id } = args;
  const { db } = context;

  // eslint-disable-next-line camelcase
  const { name_de } = await db.getWordClass(id);
  return { id, name_de };
}

// eslint-disable-next-line no-unused-vars
async function listWordClasses(parent, args, context, info) {
  const { first, offset } = args;
  const { db } = context;

  const list = await db.listAllWordClasses(first, offset);
  return list;
}

// eslint-disable-next-line no-unused-vars
async function getWordById(parent, args, context, info) {
  const { id } = args;
  const { db } = context;

  await db.getWord(id);

  return { id };
}

// eslint-disable-next-line no-unused-vars
async function listWords(parent, args, context, info) {
  const { first, offset } = args;
  const { db } = context;

  const list = await db.listAllWords(first, offset);

  const results = list.map(item => ({ id: item.id }));
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
