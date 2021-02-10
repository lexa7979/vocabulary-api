const User = {
  // id
  // login
  // name

  activeWords: getActiveWordsOfUser,
};

module.exports = User;

// eslint-disable-next-line no-unused-vars
async function getActiveWordsOfUser(parent, args, context, info) {
  const { id: userId } = parent;
  const { first, offset } = args;
  const { db } = context;

  const { activeWords } = await db.getUser(userId);
  const list = activeWords.slice(offset, first ? offset + first : undefined);

  const results = await Promise.all(
    list.map(item => db.getWord(item.wordId).then(() => item.wordId))
  );
  return results;
}
