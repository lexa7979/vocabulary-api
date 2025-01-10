const { getDatabase, disconnectAsync } = require('./connect');

const SIGNAL_VALUES = {
    SIGINT: 2,
    SIGTERM: 15,
};

async function init() {
    await getDatabase().command({ ping: 1 });

    ['beforeExit', 'exit', 'uncaughtExceptionMonitor'].forEach(event =>
        process.on(event, () => {
            // eslint-disable-next-line no-console
            console.log(`... process received event "${event}"`);
            return disconnectAsync();
        })
    );

    ['SIGINT', 'SIGTERM'].forEach(signal =>
        process.on(signal, () => {
            // eslint-disable-next-line no-console
            console.log(`... process received signal "${signal}"`);
            return disconnectAsync().then(() => process.exit(128 + SIGNAL_VALUES[signal]));
        })
    );
}

module.exports = {
    init,
};
