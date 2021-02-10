const GraphQLUUID = require('graphql-type-uuid');

const { Query, WordClass, Flection, Word, Translation, User } = require('./resolvers');

module.exports = getResolvers;

function getResolvers() {
  const resolvers = {
    UUID: GraphQLUUID,

    Query,

    WordClass,
    Flection,

    Word,
    Translation,

    User,
  };

  return resolvers;
}
