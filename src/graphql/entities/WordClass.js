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
      wordClass(id: UUID): WordClass
      wordClasses(first: Int = 0, offset: Int = 0): [WordClass!]!
    }

    type WordClass {
      id: UUID!
      name_de: String

      flections(first: Int = 0, offset: Int = 0): [Flection!]!
    }

    type Flection {
      id: UUID!
      name_de: String
      pos: Int

      wordClass: WordClass!
    }
  `;
}

/**
 * @returns {object}
 */
function getResolvers() {
  return {
    Query: {
      wordClass,
      wordClasses,
    },

    WordClass: {
      flections: flectionsOfWordClass,
    },

    Flection: {
      wordClass: wordClassOfFlection,
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
async function wordClass(parent, { id }, { db }) {
  // eslint-disable-next-line camelcase
  const { name_de } = await db.getWordClass(id);
  return {
    id,
    name_de,
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
async function wordClasses(parent, { first, offset }, { db }) {
  const list = await db.listAllWordClasses(first, offset);
  // eslint-disable-next-line camelcase
  const results = list.map(({ id, name_de }) => ({
    id,
    name_de,
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
async function flectionsOfWordClass({ id: classId }, { first, offset }, { db }) {
  const list = await db.listAllFlectionsOfWordClass(classId, first, offset);
  // eslint-disable-next-line camelcase
  const results = list.map(({ id, name_de, pos }) => ({
    id,
    name_de,
    pos,
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
async function wordClassOfFlection({ id: flectionId }, args, { db }) {
  const { classId: id } = await db.getFlection(flectionId);
  // eslint-disable-next-line camelcase
  const { name_de } = await db.getWordClass(id);
  return {
    id,
    name_de,
  };
}
