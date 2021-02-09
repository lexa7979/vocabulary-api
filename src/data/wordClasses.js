const { listAllFlectionsOfWordClass } = require('./flections');
const getTestId = require('./getTestId');

module.exports = {
  getWordClass,
  getWordClassWithFlections,

  listAllWordClasses,
};

const allWordClasses = [
  {
    id: getTestId('verb'),
    name_de: 'Verb',
    // flections: [
    //   { flectionKey: '0', name_de: 'Infinitiv' },
    //   { flectionKey: '1', name_de: 'Präsens' },
    //   { flectionKey: '2', name_de: 'Präteritum' },
    //   { flectionKey: '3', name_de: 'Perfekt' },
    //   { flectionKey: '4', name_de: 'Imperativ' },
    // ],
  },
  {
    id: getTestId('noun'),
    name_de: 'Substantiv',
    // flections: [
    //   { flectionKey: '0', name_de: 'Singular, unbestimmt' },
    //   { flectionKey: '1', name_de: 'Singular, bestimmt' },
    //   { flectionKey: '2', name_de: 'Plural, unbestimmt' },
    //   { flectionKey: '3', name_de: 'Plural, bestimmt' },
    // ],
  },
  {
    id: getTestId('adjective'),
    name_de: 'Adjektiv',
    // flections: [
    //   { flectionKey: '0', name_de: 'Grundstufe, utrum unbestimmt' },
    //   { flectionKey: '1', name_de: 'Grundstufe, neutrum unbestimmt' },
    //   { flectionKey: '2', name_de: 'Grundstufe, Plural unbestimmt' },
    //   { flectionKey: '3', name_de: 'Grundstufe, bestimmt' },
    //   { flectionKey: '4', name_de: 'Komparativ' },
    //   { flectionKey: '5', name_de: 'Superlativ' },
    // ],
  },
];

/**
 * @param {string} id
 */
async function getWordClass(id) {
  const wordClass = allWordClasses.filter(item => item.id === id)[0];
  if (wordClass == null) {
    throw new Error(`getWordClass() failed - invalid ID (${id})`);
  }
  return { ...wordClass };
}

async function getWordClassWithFlections(id) {
  const wordClass = allWordClasses.filter(item => item.id === id)[0];
  if (wordClass == null) {
    throw new Error(`getWordClass() failed - invalid ID (${id})`);
  }
  const flections = await listAllFlectionsOfWordClass(id);
  return { ...wordClass, flections };
}

async function listAllWordClasses(first = 0, offset = 0) {
  const list = allWordClasses.slice(offset, first ? offset + first : undefined);
  return list.map(item => ({ ...item }));
}
