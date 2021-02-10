const WordClass = {
  // id
  // name_de

  flections: listFlectionsOfWordClass,
};

module.exports = WordClass;

// eslint-disable-next-line no-unused-vars
async function listFlectionsOfWordClass(parent, args, context, info) {
  const { id: classId } = parent;
  const { first, offset } = args;
  const { db } = context;

  const list = await db.listAllFlectionsOfWordClass(classId, first, offset);

  const results = list.map(item => ({ id: item.id, name_de: item.name_de, pos: item.pos }));
  return results;
}
