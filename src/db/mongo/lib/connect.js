/** @import {Collection, Db} from "mongodb" */
/** @import * as Types from "../../types" */

const { MongoClient } = require('mongodb');

const global = {
    /** @type {string} */
    connectionString: 'mongodb://localhost:27017',
    /** @type {MongoClient} */
    client: null,
    /** @type {Db} */
    db: null,
    /** @type {boolean} */
    isTopologyConnected: false,
};

function setConnectionString(uri) {
    global.connectionString = uri;
}

function getClient() {
    if (!global.client) {
        global.client = new MongoClient(global.connectionString);
        global.isTopologyConnected = true;
        global.client.addListener('open', () => console.log('INIT - MongoDB connected'));
        global.client.addListener('topologyClosed', () => {
            global.isTopologyConnected = false;
            console.warn('Received MongoDB-event "topologyClosed"');
        });
    }
    return global.client;
}

function getDatabase() {
    if (!global.db) {
        const client = getClient();
        global.db = client.db('vocabulary');
    }
    return global.db;
}

function getWordsCollection() {
    /** @type {Collection<Types.IWord>} */
    const words = getDatabase().collection('words');
    return words;
}

function getTranslationsCollection() {
    /** @type {Collection<Types.ITranslation>} */
    const translations = getDatabase().collection('translations');
    return translations;
}

function getWordClassesCollection() {
    /** @type {Collection<Types.IWordClass>} */
    const wordClasses = getDatabase().collection('wordClasses');
    return wordClasses;
}

function getFlectionsCollection() {
    /** @type {Collection<Types.IFlection>} */
    const flections = getDatabase().collection('flections');
    return flections;
}

function getUsersCollection() {
    /** @type {Collection<Types.IUser>} */
    const users = getDatabase().collection('users');
    return users;
}

function getActiveWordsCollection() {
    /** @type {Collection<Types.IActiveWord>} */
    const activeWords = getDatabase().collection('activeWords');
    return activeWords;
}

async function disconnectAsync() {
    if (!global.client || !global.isTopologyConnected) {
        return;
    }

    const backup = global.client;
    global.client = null;
    global.db = null;
    global.isTopologyConnected = false;

    await backup.close();
    console.log('EXIT: MongoDB-connection closed');
}

module.exports = {
    setConnectionString,
    getClient,
    getDatabase,
    getWordsCollection,
    getTranslationsCollection,
    getWordClassesCollection,
    getFlectionsCollection,
    getUsersCollection,
    getActiveWordsCollection,
    disconnectAsync,
};
