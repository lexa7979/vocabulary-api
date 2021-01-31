module.exports = {
  listWordClasses,
  listWords,
  listFlectionsOfWordClass,
  listTranslationsOfWord,

  getWordById,
  getClassOfWord,
  // getWordOfTranslation,
  // getFlectionOfTranslation,
};

const allWordClasses = [
  { id: '4c67458e-e100-41cf-b603-d6d5ba43907c', name_de: 'Verb' },
  { id: '2f0aa94f-d30b-4c8b-b035-4438ae2cb15d', name_de: 'Substantiv' },
  { id: '32bd29b5-989d-493b-abae-a9a2afaf0c62', name_de: 'Adjektiv' },
];

const allFlectionsByWordClass = {
  '4c67458e-e100-41cf-b603-d6d5ba43907c': [
    { flectionKey: '0', name_de: 'Infinitiv' },
    { flectionKey: '1', name_de: 'Präsens' },
    { flectionKey: '2', name_de: 'Präteritum' },
    { flectionKey: '3', name_de: 'Perfekt' },
    { flectionKey: '4', name_de: 'Imperativ' },
  ],

  '2f0aa94f-d30b-4c8b-b035-4438ae2cb15d': [
    { flectionKey: '0', name_de: 'Singular, unbestimmt' },
    { flectionKey: '1', name_de: 'Singular, bestimmt' },
    { flectionKey: '2', name_de: 'Plural, unbestimmt' },
    { flectionKey: '3', name_de: 'Plural, bestimmt' },
  ],

  '32bd29b5-989d-493b-abae-a9a2afaf0c62': [
    { flectionKey: '0', name_de: 'Grundstufe, utrum unbestimmt' },
    { flectionKey: '1', name_de: 'Grundstufe, neutrum unbestimmt' },
    { flectionKey: '2', name_de: 'Grundstufe, Plural unbestimmt' },
    { flectionKey: '3', name_de: 'Grundstufe, bestimmt' },
    { flectionKey: '4', name_de: 'Komparativ' },
    { flectionKey: '5', name_de: 'Superlativ' },
  ],
};

const allWords = [
  {
    id: '557e781b-e66a-4aa1-b9e4-b7fd1a9f5814',
    classId: '4c67458e-e100-41cf-b603-d6d5ba43907c',
  },
  {
    id: '6319e7a3-0b02-4c83-afc7-b96004d134eb',
    classId: '2f0aa94f-d30b-4c8b-b035-4438ae2cb15d',
  },
  {
    id: '1a20fdc0-e1b3-41cf-89af-0ea15136f8c3',
    classId: '32bd29b5-989d-493b-abae-a9a2afaf0c62',
  },
];

const allTranslationsByWord = {
  '557e781b-e66a-4aa1-b9e4-b7fd1a9f5814': [
    { flectionKey: '0', text_de: 'gehen', text_sv: 'gå' },
    { flectionKey: '1', text_de: 'er geht', text_sv: 'han går' },
    { flectionKey: '1', text_de: 'sie geht', text_sv: 'hon går' },
    { flectionKey: '1', text_de: 'wir gehen', text_sv: 'vi går' },
    { flectionKey: '2', text_de: 'er ging', text_sv: 'han gick' },
    { flectionKey: '3', text_de: 'er ist gegangen', text_sv: 'han har gått' },
    { flectionKey: '4', text_de: 'geh!', text_sv: 'gå!' },
  ],

  '6319e7a3-0b02-4c83-afc7-b96004d134eb': [
    { flectionKey: '0', text_de: 'ein Haus', text_sv: 'ett hus' },
    { flectionKey: '1', text_de: 'das Haus', text_sv: 'huset' },
    { flectionKey: '2', text_de: 'viele Häuser', text_sv: 'många hus' },
    { flectionKey: '3', text_de: 'die Häuser', text_sv: 'husen' },
  ],

  '1a20fdc0-e1b3-41cf-89af-0ea15136f8c3': [
    { flectionKey: '0', text_de: 'ein altes Auto', text_sv: 'en gammal bil' },
    { flectionKey: '1', text_de: 'ein altes Haus', text_sv: 'ett gammalt hus' },
    { flectionKey: '2', text_de: 'viele alte Autos', text_sv: 'många gamla bilar' },
    { flectionKey: '3', text_de: 'das alte Auto', text_sv: 'den gamla bilen' },
    { flectionKey: '3', text_de: 'das alte Haus', text_sv: 'det gamla huset' },
    { flectionKey: '3', text_de: 'die alten Autos', text_sv: 'de gamla bilarna' },
    { flectionKey: '4', text_de: 'älter', text_sv: 'äldre' },
    { flectionKey: '5', text_de: 'am ältesten', text_sv: 'äldst' },
  ],
};

function listWordClasses(parent, args) {
  const { first, offset } = args;

  const results = allWordClasses.slice(offset, first ? offset + first : undefined);
  return results;
}

function listWords(parent, args) {
  const { first, offset } = args;

  // const _addWordClass = word => ({ id: word.id });
  // class: allWordClasses.filter(_class => _class.id === word.classId)[0],

  const results = allWords
    .slice(offset, first ? offset + first : undefined)
    .map(({ id }) => ({ id }));
  return results;
}

function listFlectionsOfWordClass(wordClass, args) {
  const { id: classId } = wordClass;
  const { first, offset } = args;

  if (allFlectionsByWordClass[classId] == null) {
    return [];
  }

  const matchingFlections = allFlectionsByWordClass[classId]
    .sort((itemA, itemB) => {
      if (itemA.flectionKey === itemB.flectionKey) {
        return 0;
      }
      return itemA.flectionKey < itemB.flectionKey ? -1 : 1;
    })
    // eslint-disable-next-line camelcase
    .map(({ flectionKey, name_de }) => ({ wordClass, flectionKey, name_de }));

  const results = matchingFlections.slice(offset, first ? offset + first : undefined);
  return results;
}

function listTranslationsOfWord(word, args) {
  const { id: wordId } = word;
  const { first, offset } = args;

  const wordData = allWords.filter(item => item.id === wordId)[0];
  if (wordData == null) {
    throw new Error('Missing word data');
  }

  const wordClassData = allWordClasses.filter(item => item.id === wordData.classId)[0];
  if (wordClassData == null) {
    throw new Error('Missing word-class data');
  }

  const translationsData = allTranslationsByWord[wordId];
  if (translationsData == null) {
    throw new Error('Missing translation data');
  }

  const flectionsData = allFlectionsByWordClass[wordClassData.id];
  if (flectionsData == null) {
    throw new Error('Missing flection data');
  }

  const _fillFlectionWithWordClass = flection => {
    if (flection == null) {
      throw new Error('Missing flection data (2)');
    }
    return {
      wordClass: { id: wordClassData.id, name_de: wordClassData.name_de },
      flectionKey: flection.flectionKey,
      name_de: flection.name_de,
    };
  };

  const _fillTranslationWithFlections = translation => {
    // eslint-disable-next-line camelcase
    const { flectionKey, text_de, text_sv } = translation;
    // const flection = _fillFlectionWithWordClass()
    const flection = flectionsData.filter(item => item.flectionKey === flectionKey)[0];
    // if (flection == null) {
    //   throw new Error('Missing flection data (2)');
    // }
    return { word, flection: _fillFlectionWithWordClass(flection), text_de, text_sv };
  };

  const results = translationsData
    .slice(offset, first ? offset + first : undefined)
    .map(_fillTranslationWithFlections);
  // .map(translation => {
  //   // eslint-disable-next-line camelcase
  //   const { flectionKey, text_de, text_sv } = translation;
  //   const flection = flectionsData.filter(item => item.flectionKey === flectionKey)[0];
  //   if (flection == null) {
  //     throw new Error('Missing flection data (2)');
  //   }
  //   return { word, flection, text_de, text_sv };
  // });

  return results;
}

function getWordById(parent, args) {
  const { id } = args;

  const matchingWord = allWords.filter(word => word.id === id)[0];
  if (matchingWord == null) {
    return null;
  }

  const result = { id: matchingWord.id };
  // class: allWordClasses.filter(_class => _class.id === matchingWord.classId)[0],
  return result;
}

function getClassOfWord(word, args) {
  const { id: wordId } = word;

  const wordData = allWords.filter(item => item.id === wordId)[0];
  if (wordData == null) {
    return null;
  }

  const wordClass = allWordClasses.filter(item => item.id === wordData.classId)[0];
  if (wordClass == null) {
    return null;
  }

  const result = { id: wordClass.id, name_de: wordClass.name_de };
  return result;
}

// function getWordOfTranslation(translation, args) {}

// function getFlectionOfTranslation(translation, args) {
//   const { word } = translation;
//   const { id: wordId } = word;

//   const wordData = allWords.filter(item => item.id === wordId)[0];
//   if (wordData == null) {
//     return null;
//   }
//   const { classId } = wordData;

// }
