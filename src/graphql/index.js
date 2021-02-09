const { ApolloServer } = require('apollo-server');

const getTypedefs = require('./getTypedefs');
const getResolvers = require('./getResolvers');
const DataService = require('../data');

module.exports = {
  init,
};

async function init() {
  const typeDefs = getTypedefs();
  const resolvers = getResolvers();
  const context = { db: DataService };

  const server = new ApolloServer({ typeDefs, resolvers, context });

  const { url } = await server.listen({ port: 4001 });

  return { server, url };
}
