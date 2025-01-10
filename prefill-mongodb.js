/* eslint-disable no-console */

const { init } = require('./src/db/mongo');
const { disconnectAsync } = require('./src/db/mongo/lib/connect');
const { removeCollections, prefillCollections, setupCollections } = require('./src/db/mongo/lib/setup');

runAsync();

async function runAsync() {
    const confirmed = process.argv[2] === "I'm" && process.argv[3] === 'sure';
    if (!confirmed) {
        console.warn(`Confirmation needed\n\n${process.argv[0]} ${process.argv[1]} I\\'m sure`);
        return;
    }

    console.log('Connecting MongoDB...');
    await init();

    console.log('Removing collections...');
    await removeCollections({ confirmed });

    console.log('Creating collections...');
    await setupCollections();

    console.log('Prefilling collections...');
    await prefillCollections({ confirmed });

    console.log('Disconnecting MongoDB...');
    await disconnectAsync();

    console.log('Done.');
    process.exit(0);
}
