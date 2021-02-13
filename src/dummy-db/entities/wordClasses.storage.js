const { getTestId } = require('../testIds');

const allWordClasses = [
  {
    id: getTestId('verb'),
    name_de: 'Verb',
  },
  {
    id: getTestId('noun'),
    name_de: 'Substantiv',
  },
  {
    id: getTestId('adjective'),
    name_de: 'Adjektiv',
  },
];

const _getFlectionItems = (classIdKey, ...listOfFlectionNames) => {
  const classId = getTestId(classIdKey);
  // eslint-disable-next-line camelcase
  return listOfFlectionNames.map((name_de, index) => ({
    id: getTestId(`${classIdKey}-flection${index + 1}`),
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
