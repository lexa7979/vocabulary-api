const GraphQLUUID = require('graphql-type-uuid');

const { getWordClasses: wordClasses } = require('./test-data');

module.exports = getResolvers;

function getResolvers() {
  const resolvers = {
    UUID: GraphQLUUID,

    Query: {
      wordClasses,
    },
  };

  return resolvers;
}
