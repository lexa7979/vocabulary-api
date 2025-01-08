/* eslint-disable import/prefer-default-export */

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const { allTypeDefs, allResolvers } = require('./entities');

const DataService = require('../db/dummy');

async function init() {
    const typeDefs = Object.values(allTypeDefs);
    const resolvers = Object.values(allResolvers);

    const context = async () => ({ db: DataService });

    const server = new ApolloServer({ typeDefs, resolvers });

    const { url } = await startStandaloneServer(server, { context, listen: { port: 4001 } });

    return { server, url };
}

module.exports = {
    init,
};
