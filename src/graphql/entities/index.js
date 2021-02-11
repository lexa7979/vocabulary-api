const Basics = require('./basics');
const WordClass = require('./WordClass');
const Word = require('./Word');
const User = require('./User');

const allTypeDefs = {
  Basics: Basics.typeDefs,
  WordClass: WordClass.typeDefs,
  Word: Word.typeDefs,
  User: User.typeDefs,
};

const allResolvers = {
  Basics: Basics.resolvers,
  WordClass: WordClass.resolvers,
  Word: Word.resolvers,
  User: User.resolvers,
};

module.exports = {
  allTypeDefs,
  allResolvers,
};
