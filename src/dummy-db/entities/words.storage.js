const getTestId = require('../getTestId');

const allWords = [
  {
    id: getTestId('word1'),
    classId: getTestId('verb'),
  },
  {
    id: getTestId('word2'),
    classId: getTestId('noun'),
  },
  {
    id: getTestId('word3'),
    classId: getTestId('adjective'),
  },
];

const _getTranslationItems = (wordIdKey, ...listOfFlectionIdKeyWithTextTuple) => {
  const wordId = getTestId(wordIdKey);
  // eslint-disable-next-line camelcase
  return listOfFlectionIdKeyWithTextTuple.map(([flectionIdKey, text_de, text_sv], index) => ({
    id: getTestId(`${wordIdKey}-translation${index + 1}`),
    wordId,
    flectionId: getTestId(flectionIdKey),
    text_de,
    text_sv,
  }));
};

const allTranslations = [
  ..._getTranslationItems(
    'word1',
    ['verb-flection1', 'gehen', 'gå'],
    ['verb-flection2', 'er geht', 'han går'],
    ['verb-flection2', 'sie geht', 'hun går'],
    ['verb-flection2', 'wir gehen', 'vi går'],
    ['verb-flection3', 'er ging', 'han gick'],
    ['verb-flection4', 'er ist gegangen', 'han har gått'],
    ['verb-flection5', 'geh!|geh', 'gå!|gå']
  ),
  ..._getTranslationItems(
    'word2',
    ['noun-flection1', 'ein Haus', 'ett hus'],
    ['noun-flection2', 'das Haus', 'huset'],
    ['noun-flection3', 'viele Häuser', 'många hus'],
    ['noun-flection4', 'die Häuser', 'husen']
  ),
  ..._getTranslationItems(
    'word3',
    ['adjective-flection1', 'ein altes Auto', 'en gammal bil'],
    ['adjective-flection2', 'ein altes Haus', 'ett gammalt hus'],
    ['adjective-flection3', 'viele alte Autos', 'många gamla bilar'],
    ['adjective-flection4', 'das alte Auto', 'den gamla bilen'],
    ['adjective-flection4', 'das alte Haus', 'det gamla huset'],
    ['adjective-flection4', 'die alten Autos', 'de gamla bilarna'],
    ['adjective-flection5', 'älter', 'äldre'],
    ['adjective-flection6', 'am ältesten', 'äldst']
  ),
];

module.exports = {
  allWords,
  allTranslations,
};
