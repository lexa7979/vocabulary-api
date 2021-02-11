const { allWordClasses, allFlections } = require('./wordClasses.storage');

module.exports = {
  getWordClass,
  getWordClassWithFlections,

  listAllWordClasses,

  getFlection,
  listAllFlectionsOfWordClass,
};

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
