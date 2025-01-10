/** @import {IDataService} from "../types" */

const { init } = require('./lib/init');
const ReadUsers = require('./read/users');
const ReadWordClasses = require('./read/wordClasses');
const ReadWords = require('./read/words');
const WriteUsers = require('./write/users');
const WriteWordClasses = require('./write/wordClasses');
const WriteWords = require('./write/words');

/** @type {IDataService} */
const db = {
    init,

    ...ReadWords,
    ...WriteWords,

    ...ReadWordClasses,
    ...WriteWordClasses,

    ...ReadUsers,
    ...WriteUsers,
};

module.exports = db;
