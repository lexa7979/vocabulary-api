const { init } = require('./graphql');

mainAsync();

async function mainAsync() {
    const { url } = await init();

    // eslint-disable-next-line no-console
    console.log(`🚀  Server ready at ${url}`);
}
