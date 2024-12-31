const { v4: uuid } = require('uuid');
// eslint-disable-next-line import/no-extraneous-dependencies
const humanizeDuration = require('humanize-duration');

const { registerReplaceAction } = require('../../test');

/** @typedef {string} UUID */

const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;

const Global = {
    now: new Date().getTime(),
    // now: 1614210167345,
    idBuffer: {
        // verb: '4c67458e-e100-41cf-b603-d6d5ba43907c',
        // noun: '2f0aa94f-d30b-4c8b-b035-4438ae2cb15d',
        // adjective: '32bd29b5-989d-493b-abae-a9a2afaf0c62',
        // word1: '557e781b-e66a-4aa1-b9e4-b7fd1a9f5814',
        // word2: '6319e7a3-0b02-4c83-afc7-b96004d134eb',
        // word3: '1a20fdc0-e1b3-41cf-89af-0ea15136f8c3',
        // user1: '53a52f15-c0b7-421e-a7d6-03f8f7aa90c9',
        // user2: '3676f392-4896-4636-b47b-b9d696350248',
    },
};

/**
 * @param {string} key
 * @returns {UUID}
 */
function getUUID(key) {
    if (Global.idBuffer[key] == null) {
        registerReplaceAction('replaceUUIDs', _replaceIfUUID);
        Global.idBuffer[key] = uuid();
    }
    return Global.idBuffer[key];
}

function _replaceIfUUID(value) {
    const matchUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (typeof value !== 'string' || !matchUUID.test(value)) {
        return value;
    }

    return `(ID:${findKeyOfUUID(value)})`;
}

/**
 * @param {UUID} id
 * @returns {string | null}
 */
function findKeyOfUUID(id) {
    let result = null;
    Object.keys(Global.idBuffer).forEach(key => {
        if (Global.idBuffer[key] === id) {
            result = key;
        }
    });
    return result;
}

/**
 * @param {{minutes?: number, hours?: number, days?: number}} inputBag
 * @returns {number}
 */
function getTimestampBeforeNow({ minutes = 0, hours = 0, days = 0 }) {
    registerReplaceAction('replaceTimestamps', _replaceIfTimestamp);
    const { now } = Global;
    const result = now - minutes * ONE_MINUTE - hours * ONE_HOUR - days * ONE_DAY;
    return result;
}

/**
 * @param {{minutes?: number, hours?: number, days?: number}} inputBag
 * @returns {number}
 */
function getTimestampAfterNow({ minutes = 0, hours = 0, days = 0 }) {
    registerReplaceAction('replaceTimestamps', _replaceIfTimestamp);
    const { now } = Global;
    const result = now + minutes * ONE_MINUTE + hours * ONE_HOUR + days * ONE_DAY;
    return result;
}

function _replaceIfTimestamp(value) {
    if (typeof value !== 'number') {
        return value;
    }

    const { now } = Global;

    const diff = Math.abs(now - value);
    const sign = value < now ? '-' : '+';

    if (diff < 101 * ONE_DAY) {
        const text = humanizeDuration(diff, { round: true, units: ['d', 'h', 'm'] });
        if (text.startsWith('0 ')) {
            return '(TS:now)';
        }
        if (text === '1 day') {
            return sign === '-' ? '(TS:yesterday)' : '(TS:tomorrow)';
        }
        const short = text
            .replace(/ minutes?/, 'min')
            .replace(/ hours?/, 'h')
            .replace(/ days?/, 'd')
            .replace(/, /g, ' ');
        return `(TS:${sign}${short})`;
    }

    return value;
}

module.exports = {
    getUUID,
    findKeyOfUUID,
    getTimestampBeforeNow,
    getTimestampAfterNow,

    _testInternals: {
        resetIdBuffer() {
            Global.idBuffer = {};
        },
        resetGlobalNow() {
            Global.now = new Date().getTime();
        },
    },
};
