/** @import * as DBTypes from "../db/types" */

const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * ONE_HOUR;

const minimumWaitTimeByGroup = {
    0: 12 * ONE_HOUR,
    1: 36 * ONE_HOUR,
    2: 3 * ONE_DAY - 4 * ONE_HOUR,
    3: 6 * ONE_DAY - 4 * ONE_HOUR,
    4: 10 * ONE_DAY - 4 * ONE_HOUR,
    5: 60 * ONE_DAY - 4 * ONE_HOUR,
};

/** @type {Record<DBTypes.TResult, number>} */
const groupChangeByResult = {
    correct: 1,
    'partly-correct': 0,
    wrong: -1,
};

/** @type {DBTypes.TActiveWordEventType[]} */
const flectionEventTypes = [
    //
    'flection-result',
    'flection-result-revoke',
];

const _isObject = input => input != null && typeof input === 'object';

/**
 * @param {{ db: DBTypes.IDataService, activeWordId: DBTypes.UUID }} inputBag
 * @returns {Promise<DBTypes.INextLesson[]>}
 */
async function getNextLessonsOfActiveWord(inputBag) {
    const { db, activeWordId } = inputBag || {};
    if (!_isObject(db) || !activeWordId) {
        throw new Error('getNextLessonOfActiveWord() failed - missing arguments');
    }

    const activeWord = await db.getActiveWord(activeWordId);
    const word = await db.getWordWithTranslations(activeWord.wordId);
    const wordClass = await db.getWordClassWithFlections(word.classId);

    const { events } = activeWord;
    const { translations } = word;
    const { flections } = wordClass;

    if (!Array.isArray(events) || !Array.isArray(translations) || !Array.isArray(flections)) {
        return [];
    }

    /** @type {DBTypes.INextLesson[]} */
    const nextLessons = flections
        .filter(flectionItem => translations.some(translationItem => translationItem.flectionId === flectionItem.id))
        .map(flectionItem => _getNextLessonOfFlection({ flectionId: flectionItem.id, events }))
        .filter(Boolean);
    return nextLessons;
}

/**
 * @param {{ flectionId: DBTypes.UUID, events: DBTypes.IActiveWordEvent[] }} inputBag
 * @returns {DBTypes.INextLesson}
 */
function _getNextLessonOfFlection({ flectionId, events }) {
    /** @type {DBTypes.INextLesson} */
    let lesson;

    events.forEach((eventItem, index) => {
        switch (eventItem.type) {
            case 'add': {
                lesson = { flectionId, currGroup: 0, earliestAt: eventItem.timestamp };
                return;
            }
            case 'flection-result':
            case 'flection-result-revoke': {
                const nextFlectionEvent = events.find(
                    (item, index2) => index2 > index && flectionEventTypes.includes(item.type)
                );
                if (
                    eventItem.type === 'flection-result-revoke' ||
                    (nextFlectionEvent && nextFlectionEvent.type === 'flection-result-revoke')
                ) {
                    return;
                }
                if (lesson && eventItem.flectionId === flectionId) {
                    const newGroup = Math.min(5, Math.max(0, lesson.currGroup + groupChangeByResult[eventItem.result]));
                    const earliestAt = eventItem.timestamp + minimumWaitTimeByGroup[newGroup];
                    lesson = { flectionId, currGroup: newGroup, earliestAt };
                }
                return;
            }
            default:
                throw new Error(`Unknown event-type "${eventItem.type}"`);
        }
    });

    return lesson;
}

module.exports = { getNextLessonsOfActiveWord };
