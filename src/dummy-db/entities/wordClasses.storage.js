const { getUUID } = require('../../utils/dummyData');

const allWordClasses = [
  {
    id: getUUID('verb'),
    name_de: 'Verb',
  },
  {
    id: getUUID('noun'),
    name_de: 'Substantiv',
  },
  {
    id: getUUID('adjective'),
    name_de: 'Adjektiv',
  },
];

const _getFlectionItems = (classIdKey, ...listOfFlectionNames) => {
  const classId = getUUID(classIdKey);
  // eslint-disable-next-line camelcase
  return listOfFlectionNames.map((name_de, index) => ({
    id: getUUID(`${classIdKey}-flection${index + 1}`),
    classId,
    pos: index,
    name_de,
  }));
};

const allFlections = [
  ..._getFlectionItems('verb', 'Infinitiv', 'Präsens', 'Präteritum', 'Perfekt', 'Imperativ'),
  ..._getFlectionItems(
    'noun',
    'Singular, unbestimmt',
    'Singular, bestimmt',
    'Plural, unbestimmt',
    'Plural, bestimmt'
  ),
  ..._getFlectionItems(
    'adjective',
    'Grundstufe, utrum unbestimmt',
    'Grundstufe, neutrum unbestimmt',
    'Grundstufe, Plural unbestimmt',
    'Grundstufe, bestimmt',
    'Komparativ',
    'Superlativ'
  ),
];

module.exports = {
  allWordClasses,
  allFlections,
};
