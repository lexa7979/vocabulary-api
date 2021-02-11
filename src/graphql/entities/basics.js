const { gql } = require('apollo-server');
const GraphQLUUID = require('graphql-type-uuid');

module.exports = {
  typeDefs: gql`
    scalar UUID
  `,

  resolvers: {
    UUID: GraphQLUUID,
  },
};
