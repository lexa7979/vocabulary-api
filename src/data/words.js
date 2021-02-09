const getTestId = require('./getTestId');
const { listAllTranslationsOfWord } = require('./translations');

module.exports = {
  getWord,
  getWordWithTranslations,

  listAllWords,
};

const allWords = [
  {
    id: getTestId('word1'),
    classId: getTestId('verb'),
    // translations: [
    //   { flectionKey: '0', text_de: 'gehen', text_sv: 'gå' },
    //   { flectionKey: '1', text_de: 'er geht', text_sv: 'han går' },
    //   { flectionKey: '1', text_de: 'sie geht', text_sv: 'hon går' },
    //   { flectionKey: '1', text_de: 'wir gehen', text_sv: 'vi går' },
    //   { flectionKey: '2', text_de: 'er ging', text_sv: 'han gick' },
    //   { flectionKey: '3', text_de: 'er ist gegangen', text_sv: 'han har gått' },
    //   { flectionKey: '4', text_de: 'geh!', text_sv: 'gå!' },
    // ],
  },
  {
    id: getTestId('word2'),
    classId: getTestId('noun'),
    // translations: [
    //   { flectionKey: '0', text_de: 'ein Haus', text_sv: 'ett hus' },
    //   { flectionKey: '1', text_de: 'das Haus', text_sv: 'huset' },
    //   { flectionKey: '2', text_de: 'viele Häuser', text_sv: 'många hus' },
    //   { flectionKey: '3', text_de: 'die Häuser', text_sv: 'husen' },
    // ],
  },
  {
    id: getTestId('word3'),
    classId: getTestId('adjective'),
    // translations: [
    //   { flectionKey: '0', text_de: 'ein altes Auto', text_sv: 'en gammal bil' },
    //   { flectionKey: '1', text_de: 'ein altes Haus', text_sv: 'ett gammalt hus' },
    //   { flectionKey: '2', text_de: 'viele alte Autos', text_sv: 'många gamla bilar' },
    //   { flectionKey: '3', text_de: 'das alte Auto', text_sv: 'den gamla bilen' },
    //   { flectionKey: '3', text_de: 'das alte Haus', text_sv: 'det gamla huset' },
    //   { flectionKey: '3', text_de: 'die alten Autos', text_sv: 'de gamla bilarna' },
    //   { flectionKey: '4', text_de: 'älter', text_sv: 'äldre' },
    //   { flectionKey: '5', text_de: 'am ältesten', text_sv: 'äldst' },
    // ],
  },
];

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
