module.exports = {
  init,
};

const { ApolloServer } = require('apollo-server');

const getTypedefs = require('./getTypedefs');
const getResolvers = require('./getResolvers');

async function init() {
  const typeDefs = getTypedefs();
  const resolvers = getResolvers();

  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await server.listen({ port: 4001 });

  return { server, url };
}
