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
}

/**
 * @returns {object}
 */
function getResolvers() {
  return {
    Query: {
      word,
      words,
    },

    Word: {
      wordClass: wordClassOfWord,
      translations: translationsOfWord,
    },

    Translation: {
      flection: flectionOfTranslation,
      word: wordOfTranslation,
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
async function word(parent, { id }, { db }) {
  await db.getWord(id);
  return {
    id,
  };
}

/**
 * @param {object} parent
 * @param {{ first: number, offset: number }} args
 * @param {{ db: object }} context
 *
 * @throws
 * @returns {Promise<object[]>}
 */
async function words(parent, { first, offset }, { db }) {
  const list = await db.listAllWords(first, offset);
  const results = list.map(({ id }) => ({
    id,
  }));
  return results;
}

/**
 * @param {{ id: string }} parent
 * @param {object} args
 * @param {{ db: object }} context
 *
 * @throws
 * @returns {Promise<object>}
 */
async function wordClassOfWord({ id: wordId }, args, { db }) {
  const { classId: id } = await db.getWord(wordId);
  // eslint-disable-next-line camelcase
  const { name_de } = await db.getWordClass(id);
  return {
    id,
    name_de,
  };
}

/**
 * @param {{ id: string }} parent
 * @param {{ first: number, offset: number }} args
 * @param {{ db: object}} context
 *
 * @throws
 * @returns {Promise<object[]>}
 */
async function translationsOfWord({ id: wordId }, { first, offset }, { db }) {
  const list = await db.listAllTranslationsOfWord(wordId, first, offset);
  // eslint-disable-next-line camelcase
  const results = list.map(({ id, text_de, text_sv }) => ({
    id,
    text_de,
    text_sv,
  }));
  return results;
}

/**
 * @param {{ id: string }} parent
 * @param {object} args
 * @param {{ db: object }} context
 *
 * @throws
 * @returns {Promise<object>}
 */
async function flectionOfTranslation({ id: translationId }, args, { db }) {
  const { flectionId: id } = await db.getTranslation(translationId);
  // eslint-disable-next-line camelcase
  const { name_de, pos } = await db.getFlection(id);
  return {
    id,
    name_de,
    pos,
  };
}

/**
 * @param {{ id: string }} parent
 * @param {object} args
 * @param {{ db: object }} context
 *
 * @throws
 * @returns {Promise<object>}
 */
async function wordOfTranslation({ id: translationId }, args, { db }) {
  const { wordId: id } = await db.getTranslation(translationId);
  await db.getWord(id);
  return {
    id,
  };
}
