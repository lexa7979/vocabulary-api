const getTestId = require('./getTestId');

module.exports = {
  getFlection,
  listAllFlectionsOfWordClass,
};

const allFlections = [
  {
    id: getTestId('verb-flection1'),
    classId: getTestId('verb'),
    pos: 0,
    name_de: 'Infinitiv',
  },
  {
    id: getTestId('verb-flection2'),
    classId: getTestId('verb'),
    pos: 1,
    name_de: 'Präsens',
  },
  {
    id: getTestId('verb-flection3'),
    classId: getTestId('verb'),
    pos: 2,
    name_de: 'Präteritum',
  },
  {
    id: getTestId('verb-flection4'),
    classId: getTestId('verb'),
    pos: 3,
    name_de: 'Perfekt',
  },
  {
    id: getTestId('verb-flection5'),
    classId: getTestId('verb'),
    pos: 4,
    name_de: 'Imperativ',
  },
  {
    id: getTestId('noun-flection1'),
    classId: getTestId('noun'),
    pos: 0,
    name_de: 'Singular, unbestimmt',
  },
  {
    id: getTestId('noun-flection2'),
    classId: getTestId('noun'),
    pos: 1,
    name_de: 'Singular, bestimmt',
  },
  {
    id: getTestId('noun-flection3'),
    classId: getTestId('noun'),
    pos: 2,
    name_de: 'Plural, unbestimmt',
  },
  {
    id: getTestId('noun-flection4'),
    classId: getTestId('noun'),
    pos: 3,
    name_de: 'Plural, bestimmt',
  },
  {
    id: getTestId('adjective-flection1'),
    classId: getTestId('adjective'),
    pos: 0,
    name_de: 'Grundstufe, utrum unbestimmt',
  },
  {
    id: getTestId('adjective-flection2'),
    classId: getTestId('adjective'),
    pos: 1,
    name_de: 'Grundstufe, neutrum unbestimmt',
  },
  {
    id: getTestId('adjective-flection3'),
    classId: getTestId('adjective'),
    pos: 2,
    name_de: 'Grundstufe, Plural unbestimmt',
  },
  {
    id: getTestId('adjective-flection4'),
    classId: getTestId('adjective'),
    pos: 3,
    name_de: 'Grundstufe, bestimmt',
  },
  {
    id: getTestId('adjective-flection5'),
    classId: getTestId('adjective'),
    pos: 4,
    name_de: 'Komparativ',
  },
  {
    id: getTestId('adjective-flection6'),
    classId: getTestId('adjective'),
    pos: 5,
    name_de: 'Superlativ',
  },
];

async function getFlection(id) {
  const flection = allFlections.filter(item => item.id === id)[0];
  if (flection == null) {
    throw new Error(`getFlection() failed - invalid ID (${id})`);
  }
  return { ...flection };
}

async function listAllFlectionsOfWordClass(classId, first = 0, offset = 0) {
  const list = allFlections
    .filter(item => item.classId === classId)
    .sort((itemA, itemB) => itemA.pos - itemB.pos);

  const results = list.slice(offset, first ? offset + first : undefined);
  return results;
}
