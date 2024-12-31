const {
    getWord,
    getWordWithTranslations,
    listAllWords,
    getTranslation,
    listAllTranslationsOfWord,
} = require('./entities/words');

const {
    getWordClass,
    getWordClassWithFlections,
    listAllWordClasses,
    getFlection,
    listAllFlectionsOfWordClass,
} = require('./entities/wordClasses');

const {
    //
    getUser,
    listAllUsers,
    getActiveWord,
    listAllActiveWordsOfUser,
} = require('./entities/users');

module.exports = {
    getWord,
    getWordWithTranslations,
    listAllWords,
    getTranslation,
    listAllTranslationsOfWord,

    getWordClass,
    getWordClassWithFlections,
    listAllWordClasses,
    getFlection,
    listAllFlectionsOfWordClass,

    getUser,
    listAllUsers,
    getActiveWord,
    listAllActiveWordsOfUser,
};
