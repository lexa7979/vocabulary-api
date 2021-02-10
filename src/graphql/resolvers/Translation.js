const Translation = {
  // id
  // text_de
  // text_sv

  flection: getFlectionOfTranslation,
  word: getWordOfTranslation,
};

module.exports = Translation;

// eslint-disable-next-line no-unused-vars
async function getFlectionOfTranslation(parent, args, context, info) {
  const { id: translationId } = parent;
  const { db } = context;

  const { flectionId } = await db.getTranslation(translationId);
  // eslint-disable-next-line camelcase
  const { name_de, pos } = await db.getFlection(flectionId);

  return { id: flectionId, name_de, pos };
}

// eslint-disable-next-line no-unused-vars
async function getWordOfTranslation(parent, args, context, info) {
  const { id: translationId } = parent;
  const { db } = context;

  const { wordId } = await db.getTranslation(translationId);
  // eslint-disable-next-line camelcase
  const { name_de } = await db.getWord(wordId);

  return { id: wordId, name_de };
}
