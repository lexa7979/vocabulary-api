const GraphQLUUID = require('graphql-type-uuid');

module.exports = getResolvers;

function getResolvers() {
  const resolvers = {
    UUID: GraphQLUUID,

    Query: {
      wordClasses: listWordClasses,
      word: getWordById,
      words: listWords,
      users: listUsers,
    },

    WordClass: {
      // id
      // name_de
      flections: listFlectionsOfWordClass,
    },

    Flection: {
      // id
      wordClass: getWordClassOfFlection,
      // name_de
      // pos
    },

    Word: {
      // id
      wordClass: getWordClassOfWord,
      translations: listTranslationsOfWord,
    },

    Translation: {
      // id
      flection: getFlectionOfTranslation,
      // text_de
      // text_sv
      word: getWordOfTranslation,
    },

    User: {
      // id
      // login
      // name
      activeWords: getActiveWordsOfUser,
    },
  };

  return resolvers;
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
async function listUsers(parent, args, context, info) {
  const { first, offset } = args;
  const { db } = context;

  const list = await db.listAllUsers(first, offset);

  const results = list.map(item => ({ id: item.id, login: item.login, name: item.name }));
  return results;
}

// eslint-disable-next-line no-unused-vars
async function listFlectionsOfWordClass(parent, args, context, info) {
  const { id: classId } = parent;
  const { first, offset } = args;
  const { db } = context;

  const list = await db.listAllFlectionsOfWordClass(classId, first, offset);

  const results = list.map(item => ({ id: item.id, name_de: item.name_de, pos: item.pos }));
  return results;
}

// eslint-disable-next-line no-unused-vars
async function getWordClassOfFlection(parent, args, context, info) {
  const { id: flectionId } = parent;
  const { db } = context;

  const { classId } = await db.getFlection(flectionId);
  // eslint-disable-next-line camelcase
  const { name_de } = await db.getWordClass(classId);

  return { id: classId, name_de };
}

// eslint-disable-next-line no-unused-vars
async function getWordClassOfWord(parent, args, context, info) {
  const { id: wordId } = parent;
  const { db } = context;

  const { classId } = await db.getWord(wordId);
  // eslint-disable-next-line camelcase
  const { name_de } = await db.getWordClass(classId);

  return { id: classId, name_de };
}

// eslint-disable-next-line no-unused-vars
async function listTranslationsOfWord(parent, args, context, info) {
  const { id: wordId } = parent;
  const { first, offset } = args;
  const { db } = context;

  const list = await db.listAllTranslationsOfWord(wordId, first, offset);

  const results = list.map(item => ({ id: item.id, text_de: item.text_de, text_sv: item.text_sv }));
  return results;
}

// eslint-disable-next-line no-unused-vars
async function getFlectionOfTranslation(parent, args, context, info) {
  const { id: translationId } = parent;
  const { db } = context;

  const { flectionId } = await db.getTranslation(translationId);
  // eslint-disable-next-line camelcase
  const { name_de, pos } = await db.getFlection(flectionId);

  return { id: flectionId, name_de, pos };
}

// eslint-disable-next-line no-unused-vars
async function getWordOfTranslation(parent, args, context, info) {
  const { id: translationId } = parent;
  const { db } = context;

  const { wordId } = await db.getTranslation(translationId);
  // eslint-disable-next-line camelcase
  const { name_de } = await db.getWord(wordId);

  return { id: wordId, name_de };
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
