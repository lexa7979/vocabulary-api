/* eslint-disable camelcase */

const { getUUID } = require('../../utils/dummyData');

/** @type {import('../types').IWord[]} */
const allWords = [
    { id: getUUID('word1'), classId: getUUID('verb') },
    { id: getUUID('word2'), classId: getUUID('noun') },
    { id: getUUID('word3'), classId: getUUID('adjective') },
    { id: getUUID('word4'), classId: getUUID('noun') },
    { id: getUUID('word5'), classId: getUUID('noun') },
    { id: getUUID('word6'), classId: getUUID('noun') },
    { id: getUUID('word7'), classId: getUUID('noun') },
    { id: getUUID('word8'), classId: getUUID('noun') },
    { id: getUUID('word9'), classId: getUUID('noun') },
    { id: getUUID('word10'), classId: getUUID('noun') },
    { id: getUUID('word11'), classId: getUUID('noun') },
    { id: getUUID('word12'), classId: getUUID('noun') },
];

/** @type {import('../types').ITranslation[]} */
const allTranslations = [
    ..._getTranslationItems(
        'word1',
        ['verb-flection1', 'gehen', 'gå'],
        ['verb-flection2', 'er geht', 'han går'],
        ['verb-flection2', 'sie geht', 'hon går'],
        ['verb-flection2', 'wir gehen', 'vi går'],
        ['verb-flection3', 'er ging', 'han gick'],
        ['verb-flection4', 'er ist gegangen', 'han har gått'],
        ['verb-flection5', 'geh!|geh', 'gå!|gå']
    ),
    ..._getTranslationItems(
        'word2',
        ['noun-flection1', 'ein Haus', 'ett hus'],
        ['noun-flection2', 'das Haus', 'huset'],
        ['noun-flection3', 'viele Häuser', 'många hus'],
        ['noun-flection4', 'die Häuser', 'husen']
    ),
    ..._getTranslationItems(
        'word3',
        ['adjective-flection1', 'ein altes Auto', 'en gammal bil'],
        ['adjective-flection2', 'ein altes Haus', 'ett gammalt hus'],
        ['adjective-flection3', 'viele alte Autos', 'många gamla bilar'],
        ['adjective-flection4', 'das alte Auto', 'den gamla bilen'],
        ['adjective-flection4', 'das alte Haus', 'det gamla huset'],
        ['adjective-flection4', 'die alten Autos', 'de gamla bilarna'],
        ['adjective-flection5', 'älter', 'äldre'],
        ['adjective-flection6', 'am ältesten', 'äldst']
    ),
    ..._getTranslationItems(
        'word4',
        ['noun-flection1', 'ein Vogel', 'en fågel'],
        ['noun-flection2', 'der Vogel', 'fågeln']
    ),
    ..._getTranslationItems('word5', ['noun-flection1', 'ein Elch', 'en älg'], ['noun-flection2', 'der Elch', 'älgen']),
    ..._getTranslationItems(
        'word6',
        ['noun-flection1', 'ein Rentier', 'en ren'],
        ['noun-flection2', 'das Rentier', 'renen']
    ),
    ..._getTranslationItems(
        'word7',
        ['noun-flection1', 'ein Fenster', 'ett fönster'],
        ['noun-flection2', 'das Fenster', 'fönstret']
    ),
    ..._getTranslationItems(
        'word8',
        ['noun-flection1', 'ein Kühlschrank', 'ett kylskåp'],
        ['noun-flection2', 'der Kühlschrank', 'kylskåpet']
    ),
    ..._getTranslationItems(
        'word9',
        ['noun-flection1', 'eine Website', 'en webbsajt'],
        ['noun-flection2', 'die Website', 'webbsajten']
    ),
    ..._getTranslationItems(
        'word10',
        ['noun-flection1', 'eine Decke', 'ett täcke'],
        ['noun-flection2', 'die Decke', 'täcket']
    ),
    ..._getTranslationItems(
        'word11',
        ['noun-flection1', 'eine Krankenschwester', 'en sjuksjöterska'],
        ['noun-flection2', 'die Krankenschwester', 'sjuksköterskan']
    ),
    ..._getTranslationItems(
        'word12',
        ['noun-flection1', 'ein Schild', 'en skylt'],
        ['noun-flection2', 'das Schild', 'skylten']
    ),
];

/**
 * @param {import('../types').UUID} wordIdKey
 * @param {...[flectionIdKey: string, text_de: string, text_sv: string]} listOfFlectionIdKeyWithTextTuple
 * @return {import('../types').ITranslation[]}
 */
function _getTranslationItems(wordIdKey, ...listOfFlectionIdKeyWithTextTuple) {
    const wordId = getUUID(wordIdKey);
    return listOfFlectionIdKeyWithTextTuple.map(([flectionIdKey, text_de, text_sv], index) => {
        const id = getUUID(`${wordIdKey}-translation${index + 1}`);
        const flectionId = getUUID(flectionIdKey);
        return { id, wordId, flectionId, text_de, text_sv };
    });
}

module.exports = {
    allWords,
    allTranslations,
};
