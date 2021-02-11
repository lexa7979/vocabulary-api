const WordClasses = require('./wordClasses');
const Flections = require('./flections');
const Words = require('./words');
const Translations = require('./translations');
const Users = require('./users');
const ActiveWords = require('./activeWords');

module.exports = {
  ...WordClasses,
  ...Flections,
  ...Words,
  ...Translations,
  ...Users,
  ...ActiveWords,
};
