const GraphQLUUID = require('graphql-type-uuid');

module.exports = {
    typeDefs: `#graphql
        scalar UUID
    `,

    resolvers: {
        UUID: GraphQLUUID,
    },
};
