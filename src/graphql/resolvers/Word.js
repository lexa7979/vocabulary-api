const Word = {
  // id

  wordClass: getWordClassOfWord,
  translations: listTranslationsOfWord,
};

module.exports = Word;

// eslint-disable-next-line no-unused-vars
async function getWordClassOfWord(parent, args, context, info) {
  const { id: wordId } = parent;
  const { db } = context;

  const { classId } = await db.getWord(wordId);
  // eslint-disable-next-line camelcase
  const { name_de } = await db.getWordClass(classId);

  return { id: classId, name_de };
}

// eslint-disable-next-line no-unused-vars
async function listTranslationsOfWord(parent, args, context, info) {
  const { id: wordId } = parent;
  const { first, offset } = args;
  const { db } = context;

  const list = await db.listAllTranslationsOfWord(wordId, first, offset);

  const results = list.map(item => ({ id: item.id, text_de: item.text_de, text_sv: item.text_sv }));
  return results;
}
