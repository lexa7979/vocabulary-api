const { gql } = require('apollo-server');

module.exports = {
  typeDefs: getTypeDefs(),
  resolvers: getResolvers(),
};

function getTypeDefs() {
  const typeDefs = gql`
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
  return typeDefs;
}

function getResolvers() {
  const resolvers = {
    Query: {
      wordClass: getWordClassById,
      wordClasses: listWordClasses,
    },

    WordClass: {
      flections: listFlectionsOfWordClass,
    },

    Flection: {
      wordClass: getWordClassOfFlection,
    },
  };
  return resolvers;
}

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
