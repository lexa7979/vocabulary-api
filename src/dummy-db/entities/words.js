const { allWords, allTranslations } = require('./words.storage');

module.exports = {
  getWord,
  getWordWithTranslations,

  listAllWords,

  getTranslation,
  listAllTranslationsOfWord,
};

/**
 * @param {string} id
 */
async function getWord(id) {
  const word = allWords.filter(item => item.id === id)[0];
  if (word == null) {
    throw new Error(`getWord() failed - invalid ID (${id})`);
  }
  return word;
}

async function getWordWithTranslations(id) {
  const word = allWords.filter(item => item.id === id)[0];
  if (word == null) {
    throw new Error(`getWordWithTranslation() failed - invalid ID (${id})`);
  }
  const translations = await listAllTranslationsOfWord(id);
  return { ...word, translations };
}

async function listAllWords(first = 0, offset = 0) {
  const results = allWords.slice(offset, first ? offset + first : undefined);
  return results;
}

async function getTranslation(id) {
  const translation = allTranslations.filter(item => item.id === id)[0];
  if (translation == null) {
    throw new Error(`getTranslation() failed - invalid ID (${id})`);
  }
  return { ...translation };
}

async function listAllTranslationsOfWord(wordId, first = 0, offset = 0) {
  const list = allTranslations.filter(item => item.wordId === wordId);

  const results = list.slice(offset, first ? offset + first : undefined);
  return results;
}
