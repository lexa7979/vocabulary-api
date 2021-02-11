const WordClasses = require('./entities/wordClasses');
const Words = require('./entities/words');
const Users = require('./entities/users');

module.exports = {
  ...WordClasses,
  ...Words,
  ...Users,
};
