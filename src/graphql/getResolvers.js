const GraphQLUUID = require('graphql-type-uuid');

const {
  listWordClasses,
  listWords,
  listFlectionsOfWordClass,
  listTranslationsOfWord,

  getWordById,
  getClassOfWord,
  // getWordOfTranslation,
  // getFlectionOfTranslation,
} = require('./test-data');

module.exports = getResolvers;

function getResolvers() {
  const resolvers = {
    UUID: GraphQLUUID,

    Query: {
      wordClasses: listWordClasses,
      word: getWordById,
      words: listWords,
    },

    WordClass: {
      flections: listFlectionsOfWordClass,
    },

    Word: {
      class: getClassOfWord,
      translations: listTranslationsOfWord,
    },

    // Translation: {
    //   flection: getFlectionOfTranslation,
    // },
  };

  return resolvers;
}
