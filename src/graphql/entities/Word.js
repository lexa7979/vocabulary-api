const { gql } = require('apollo-server');

module.exports = {
  typeDefs: getTypeDefs(),
  resolvers: getResolvers(),
};

function getTypeDefs() {
  const typeDefs = gql`
    type Query {
      word(id: UUID): Word
      words(first: Int = 0, offset: Int = 0): [Word!]!
    }

    type Word {
      id: UUID!

      wordClass: WordClass
      translations(first: Int = 0, offset: Int = 0): [Translation!]!
    }

    type Translation {
      id: UUID!
      text_de: String!
      text_sv: String!

      flection: Flection
      word: Word!
    }
  `;
  return typeDefs;
}

function getResolvers() {
  const resolvers = {
    Query: {
      word: getWordById,
      words: listWords,
    },

    Word: {
      wordClass: getWordClassOfWord,
      translations: listTranslationsOfWord,
    },

    Translation: {
      flection: getFlectionOfTranslation,
      word: getWordOfTranslation,
    },
  };
  return resolvers;
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
