/** @import * as DBTypes from "../db/types" */

module.exports = getNextLearnSteps;

module.exports._testInternals = {
    getHelperClass,
};

const _isObject = input => input != null && typeof input === 'object';
const _isNoObject = input => input == null || typeof input !== 'object';

const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * ONE_HOUR;

const ONHOLD_TIMEOUT_LONG_OVERDUE = 5 * ONE_DAY;
const MINIMUM_TIME_BEFORE_REPEATING_WORD = 12 * ONE_HOUR;

const MINIMAL_STEPCOUNT_BEFORE_REPEATING_WORD = 3;
const NORMAL_STEPCOUNT_BEFORE_REPEATING_WORD = 10;

class NextLearnStepsFinder {
    /**
     * @param {{ db: DBTypes.IDataService, userId: string, nextStepsCount: number }} inputBag
     */
    constructor(inputBag) {
        if (_isNoObject(inputBag)) {
            throw new Error('missing arguments');
        }

        const { db, userId, nextStepsCount } = inputBag;
        if (_isNoObject(db)) {
            throw new Error('argument "db" must be a valid object');
        }
        if (typeof userId !== 'string' || userId === '') {
            throw new Error('argument "userId" must be a valid string');
        }
        if (typeof nextStepsCount !== 'number' || nextStepsCount < 0) {
            throw new Error('argument "nextStepsCount" must be a valid number');
        }

        this.now = new Date().getTime();

        this.db = db;
        this.userId = userId;
        this.nextStepsCount = nextStepsCount;

        this.userCurrStep = null;
        this.userLearnPath = null;
        this.userActiveWords = null;

        this.userLastPreparedStep = null;
        this.numberOfNeededNewSteps = null;

        this.availableLearnSteps = [];
        this.newLearnSteps = [];
    }

    /**
     * @returns {Promise}
     */
    async process() {
        await this._getUserData();

        this._countPreparedAndNeededSteps();
        if (this.numberOfNeededNewSteps === 0) {
            return;
        }

        await this._getActiveWords();

        const _calculateRankingAndAddToAvailableLearnSteps = activeWord => this._processOneActiveWord({ activeWord });

        for (let i = 0; i < this.userActiveWords.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await _calculateRankingAndAddToAvailableLearnSteps(this.userActiveWords[i]);
        }

        this._composeNextLearnSteps();
    }

    /**
     * @returns {Promise}
     */
    async _getUserData() {
        const { currStep, learnPath } = await this.db.getUser(this.userId);

        if (typeof currStep === 'number' && currStep >= 0) {
            if (Array.isArray(learnPath) && learnPath.every(_isObject)) {
                this.userCurrStep = currStep;
                this.userLearnPath = learnPath;
                return;
            }

            throw new Error(`got invalid property "learnPath" with user ${this.userId}`);
        }

        throw new Error(`got invalid property "currStep" with user ${this.userId}`);
    }

    /**
     */
    _countPreparedAndNeededSteps() {
        if (this.userLearnPath.some(pathItem => typeof pathItem.step !== 'number' || pathItem.step <= 0)) {
            throw new Error(`got invalid item(s) in learnPath of user ${this.userId}`);
        }

        const allPreparedSteps = this.userLearnPath.map(pathItem => pathItem.step);

        this.userLastPreparedStep = Math.max(this.userCurrStep, ...allPreparedSteps);

        this.numberOfNeededNewSteps = Math.max(0, this.userCurrStep + this.nextStepsCount - this.userLastPreparedStep);
    }

    /**
     * @returns {Promise}
     */
    async _getActiveWords() {
        const activeWords = await this.db.listAllActiveWordsOfUser(this.userId);

        if (Array.isArray(activeWords) && activeWords.every(_isObject)) {
            this.userActiveWords = activeWords;
            return;
        }

        throw new Error(`got invalid property "activeWords" with user ${this.userId}`);
    }

    /**
     * @param {{ activeWord: object }} inputBag
     */
    async _processOneActiveWord({ activeWord }) {
        const { id, wordId, learnProgress } = activeWord;

        if (typeof wordId !== 'string' || wordId === '') {
            throw new Error(`got invalid property "wordId" with active-word ${id} of user ${this.userId}`);
        }
        if (!Array.isArray(learnProgress) || learnProgress.some(_isNoObject)) {
            throw new Error(`got invalid property "learnProgress" with active-word ${id} of user ${this.userId}`);
        }

        const latestProgressStep = this.userLearnPath
            .filter(pathItem => pathItem.wordId === wordId)
            .reduce((max, pathItem) => Math.max(max, pathItem.step), -1);
        const activeWordIsAlreadyPrepared = latestProgressStep != null && latestProgressStep >= this.userCurrStep;
        if (activeWordIsAlreadyPrepared) {
            return;
        }

        const earliestNewStep =
            latestProgressStep == null ? 0 : latestProgressStep + NORMAL_STEPCOUNT_BEFORE_REPEATING_WORD;

        const allPossibleProgressItems = await this._getAllPossibleProgressItemsBasedOnTranslations({
            wordId,
            learnProgress,
        });

        const timeOfLastProgress = allPossibleProgressItems
            .filter(({ changedAt }) => changedAt != null)
            .reduce((max, { changedAt }) => Math.max(max, changedAt), 0);
        const activeWordAlreadyUsedShortly = timeOfLastProgress + MINIMUM_TIME_BEFORE_REPEATING_WORD > this.now;
        if (activeWordAlreadyUsedShortly) {
            return;
        }

        const rankingOfAllProgressItems = [];
        allPossibleProgressItems.forEach(progressItem => {
            const ranking = this._getRanking({ progressItem });
            rankingOfAllProgressItems.push({ ...progressItem, ranking });
        });

        rankingOfAllProgressItems.sort((itemA, itemB) => itemB.ranking - itemA.ranking);

        const progressItemWithHighestRanking = rankingOfAllProgressItems[0];
        if (progressItemWithHighestRanking == null || progressItemWithHighestRanking.ranking === 0) {
            return;
        }

        this.availableLearnSteps.push({
            latestProgressStep,
            earliestNewStep,
            ranking: progressItemWithHighestRanking.ranking,
            wordId,
            flectionId: progressItemWithHighestRanking.flectionId,
            used: false,
        });
    }

    /**
     * @param {{ wordId: string }} inputBag
     * @returns {Promise<string[]>}
     */
    async _getAvailableFlectionsFromTranslations({ wordId }) {
        const { translations } = await this.db.getWordWithTranslations(wordId);

        const plainFlectionIdsFromTranslation = translations
            .filter(item => item.text_de && item.text_sv)
            .map(item => item.flectionId)
            .filter((flectionId, index, array) => index === 0 || array[index - 1] !== flectionId);

        return plainFlectionIdsFromTranslation;
    }

    /**
     * @param {{ wordId: string, learnProgress: object[] }} inputBag
     * @returns {Promise<object[]>}
     *    list of objects with shape { changedAt, currGroup, flectionId }
     *    containing exactly one item for every available translation-group
     */
    async _getAllPossibleProgressItemsBasedOnTranslations({ wordId, learnProgress }) {
        const listOfAvailableFlectionIds = await this._getAvailableFlectionsFromTranslations({
            wordId,
        });

        const allPossibleProgressItems = listOfAvailableFlectionIds.map(flectionId => {
            const progressItem = learnProgress.filter(item => item.flectionId === flectionId)[0];
            if (progressItem == null) {
                return { changedAt: null, currGroup: 0, flectionId };
            }
            const { changedAt, currGroup } = progressItem;
            return { changedAt, currGroup, flectionId };
        });

        return allPossibleProgressItems;
    }

    /**
     *
     * @param {{ progressItem: object }} inputBag
     *
     * @returns {number}
     *  between 0 (i.e. ignore word) and 100 (i.e. urgent to choose)
     */
    _getRanking({ progressItem }) {
        const { changedAt, currGroup } = progressItem;

        const onHoldTimeoutMS = this._getOnHoldTimeout({ currGroup, changedAt });
        if (onHoldTimeoutMS > 0) {
            return 0;
        }

        let maxPoints = 0;
        let currPoints = 0;

        maxPoints += 100;
        currPoints += Math.floor((-onHoldTimeoutMS / ONHOLD_TIMEOUT_LONG_OVERDUE) * 100);

        maxPoints += 50;
        currPoints += Math.ceil(Math.random() * 50);

        return Math.floor((currPoints / maxPoints) * 100);
    }

    /**
     * The group of an active-word's flection determines the successful
     * learn progress with this vocabulary. The better a user
     * knows a vocabulary the longer it should stay on hold.
     *
     * @param {{ currGroup: number, changedAt: number }} inputBag
     * @returns {number}
     *    time in milliseconds > 0:
     *      time until flection of active-word will no longer be on hold;
     *    -ONHOLD_TIMEOUT_LONG_OVERDUE <= time (ms) <= 0:
     *      time since flection of active-word was no longer on hold
     */
    _getOnHoldTimeout({ currGroup, changedAt }) {
        if (changedAt === 0) {
            return ONHOLD_TIMEOUT_LONG_OVERDUE;
        }

        const minimumWaitTimeByGroup = {
            0: 12 * ONE_HOUR,
            1: 36 * ONE_HOUR,
            2: 3 * ONE_DAY - 4 * ONE_HOUR,
            3: 6 * ONE_DAY - 4 * ONE_HOUR,
            4: 10 * ONE_DAY - 4 * ONE_HOUR,
            5: 60 * ONE_DAY - 4 * ONE_HOUR,
        };

        const timeSinceLastChangeMS = this.now - changedAt;
        const rawOnHoldTimeoutMS = minimumWaitTimeByGroup[currGroup] - timeSinceLastChangeMS;

        return Math.max(rawOnHoldTimeoutMS, -ONHOLD_TIMEOUT_LONG_OVERDUE);
    }

    _composeNextLearnSteps() {
        this.availableLearnSteps.sort((itemA, itemB) => itemB.ranking - itemA.ranking);

        for (let i = 1; i <= this.numberOfNeededNewSteps; i += 1) {
            const step = this.userLastPreparedStep + i;

            let chosen = null;
            for (
                let stepDiff = NORMAL_STEPCOUNT_BEFORE_REPEATING_WORD;
                stepDiff >= MINIMAL_STEPCOUNT_BEFORE_REPEATING_WORD;
                stepDiff -= 1
            ) {
                const available = this.availableLearnSteps
                    .filter(item => item.used === false)
                    .filter(item => item.latestProgressStep == null || step >= item.latestProgressStep + stepDiff);
                if (available.length > 0) {
                    [chosen] = available;
                    chosen.used = true;
                    break;
                }
            }

            if (chosen == null) {
                return;
            }

            this.newLearnSteps.push({
                step,
                result: null,
                flectionId: chosen.flectionId,
                wordId: chosen.wordId,
            });
        }
    }

    async updateUserData() {
        console.log('updated user data', { learnPath: [...this.userLearnPath, ...this.newLearnSteps] });
    }
}

/**
 * @param {object} inputBag
 * @param {DBTypes.IDataService} inputBag.db
 * @param {DBTypes.UUID} inputBag.userId
 * @param {number} inputBag.nextStepsCount
 */
async function getNextLearnSteps(inputBag) {
    try {
        const obj = new NextLearnStepsFinder(inputBag);
        await obj.process();
        await obj.updateUserData();
    } catch (error) {
        error.message = `getNextLearnSteps() failed - ${error.message}`;
        throw error;
    }
}

function getHelperClass() {
    return NextLearnStepsFinder;
}
