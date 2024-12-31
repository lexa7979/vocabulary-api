/* eslint-disable camelcase */

const { getUUID } = require('../../utils/dummyData');

/** @type {import('../types').IWordClass[]} */
const allWordClasses = [
    { id: getUUID('verb'), name_de: 'Verb' },
    { id: getUUID('noun'), name_de: 'Substantiv' },
    { id: getUUID('adjective'), name_de: 'Adjektiv' },
];

/** @type {import('../types').IFlection[]} */
const allFlections = [
    ..._getFlectionItems('verb', [
        //
        'Infinitiv',
        'Präsens',
        'Präteritum',
        'Perfekt',
        'Imperativ',
    ]),
    ..._getFlectionItems('noun', [
        'Singular, unbestimmt',
        'Singular, bestimmt',
        'Plural, unbestimmt',
        'Plural, bestimmt',
    ]),
    ..._getFlectionItems('adjective', [
        'Grundstufe, utrum unbestimmt',
        'Grundstufe, neutrum unbestimmt',
        'Grundstufe, Plural unbestimmt',
        'Grundstufe, bestimmt',
        'Komparativ',
        'Superlativ',
    ]),
];

/**
 * @param {string} classIdKey
 * @param  {string[]} listOfFlectionNames
 * @returns {import('../types').IFlection[]}
 */
function _getFlectionItems(classIdKey, listOfFlectionNames) {
    const classId = getUUID(classIdKey);
    return listOfFlectionNames.map((name_de, index) => ({
        id: getUUID(`${classIdKey}-flection${index + 1}`),
        classId,
        pos: index,
        name_de,
    }));
}

module.exports = {
    allWordClasses,
    allFlections,
};
