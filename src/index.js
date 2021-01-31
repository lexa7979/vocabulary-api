const GraphQL = require('./graphql');

mainAsync();

async function mainAsync() {
  const { url } = await GraphQL.init();

  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
}
