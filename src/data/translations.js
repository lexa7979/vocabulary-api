const getTestId = require('./getTestId');

module.exports = {
  getTranslation,
  listAllTranslationsOfWord,
};

const allTranslations = [
  {
    id: getTestId('word1-translation1'),
    wordId: getTestId('word1'),
    flectionId: getTestId('verb-flection1'),
    text_de: 'gehen',
    text_sv: 'gå',
  },
  {
    id: getTestId('word1-translation2'),
    wordId: getTestId('word1'),
    flectionId: getTestId('verb-flection2'),
    text_de: 'er geht',
    text_sv: 'han går',
  },
  {
    id: getTestId('word1-translation3'),
    wordId: getTestId('word1'),
    flectionId: getTestId('verb-flection2'),
    text_de: 'sie geht',
    text_sv: 'hon går',
  },
  {
    id: getTestId('word1-translation4'),
    wordId: getTestId('word1'),
    flectionId: getTestId('verb-flection2'),
    text_de: 'wir gehen',
    text_sv: 'vi går',
  },
  {
    id: getTestId('word1-translation5'),
    wordId: getTestId('word1'),
    flectionId: getTestId('verb-flection3'),
    text_de: 'er ging',
    text_sv: 'han gick',
  },
  {
    id: getTestId('word1-translation6'),
    wordId: getTestId('word1'),
    flectionId: getTestId('verb-flection4'),
    text_de: 'er ist gegangen',
    text_sv: 'han har gått',
  },
  {
    id: getTestId('word1-translation7'),
    wordId: getTestId('word1'),
    flectionId: getTestId('verb-flection5'),
    text_de: 'geh!',
    text_sv: 'gå!',
  },
  {
    id: getTestId('word2-translation1'),
    wordId: getTestId('word2'),
    flectionId: getTestId('noun-flection1'),
    text_de: 'ein Haus',
    text_sv: 'ett hus',
  },
  {
    id: getTestId('word2-translation2'),
    wordId: getTestId('word2'),
    flectionId: getTestId('noun-flection2'),
    text_de: 'das Haus',
    text_sv: 'huset',
  },
  {
    id: getTestId('word2-translation3'),
    wordId: getTestId('word2'),
    flectionId: getTestId('noun-flection3'),
    text_de: 'viele Häuser',
    text_sv: 'många hus',
  },
  {
    id: getTestId('word2-translation4'),
    wordId: getTestId('word2'),
    flectionId: getTestId('noun-flection4'),
    text_de: 'die Häuser',
    text_sv: 'husen',
  },
  {
    id: getTestId('word3-translation1'),
    wordId: getTestId('word3'),
    flectionId: getTestId('adjective-flection1'),
    text_de: 'ein altes Auto',
    text_sv: 'en gammal bil',
  },
  {
    id: getTestId('word3-translation2'),
    wordId: getTestId('word3'),
    flectionId: getTestId('adjective-flection2'),
    text_de: 'ein altes Haus',
    text_sv: 'ett gammalt hus',
  },
  {
    id: getTestId('word3-translation3'),
    wordId: getTestId('word3'),
    flectionId: getTestId('adjective-flection3'),
    text_de: 'viele alte Autos',
    text_sv: 'många gamla bilar',
  },
  {
    id: getTestId('word3-translation4'),
    wordId: getTestId('word3'),
    flectionId: getTestId('adjective-flection4'),
    text_de: 'das alte Auto',
    text_sv: 'den gamla bilen',
  },
  {
    id: getTestId('word3-translation5'),
    wordId: getTestId('word3'),
    flectionId: getTestId('adjective-flection4'),
    text_de: 'das alte Haus',
    text_sv: 'det gamla huset',
  },
  {
    id: getTestId('word3-translation6'),
    wordId: getTestId('word3'),
    flectionId: getTestId('adjective-flection4'),
    text_de: 'die alten Autos',
    text_sv: 'de gamla bilarna',
  },
  {
    id: getTestId('word3-translation7'),
    wordId: getTestId('word3'),
    flectionId: getTestId('adjective-flection5'),
    text_de: 'älter',
    text_sv: 'äldre',
  },
  {
    id: getTestId('word3-translation8'),
    wordId: getTestId('word3'),
    flectionId: getTestId('adjective-flection6'),
    text_de: 'am ältesten',
    text_sv: 'äldst',
  },
];

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
