const { ApolloServer, mergeSchemas } = require('apollo-server');

const { allTypeDefs, allResolvers } = require('./entities');

const DataService = require('../data');

module.exports = {
  init,
};

async function init() {
  const schema = mergeSchemas({
    schemas: Object.values(allTypeDefs),
    resolvers: Object.values(allResolvers),
  });

  const context = { db: DataService };

  const server = new ApolloServer({ schema, context });

  const { url } = await server.listen({ port: 4001 });

  return { server, url };
}
