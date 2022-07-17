const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const { allTypeDefs, allResolvers } = require('./entities');

const DataService = require('../dummy-db');

module.exports = {
  init,
};

async function init() {
  const schema = makeExecutableSchema({
    typeDefs: Object.values(allTypeDefs),
    resolvers: Object.values(allResolvers),
  });

  const context = { db: DataService };

  const server = new ApolloServer({ schema, context });

  const { url } = await server.listen({ port: 4001 });

  return { server, url };
}
