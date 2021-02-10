const Flection = {
  // id
  // name_de
  // pos

  wordClass: getWordClassOfFlection,
};

module.exports = Flection;

// eslint-disable-next-line no-unused-vars
async function getWordClassOfFlection(parent, args, context, info) {
  const { id: flectionId } = parent;
  const { db } = context;

  const { classId } = await db.getFlection(flectionId);
  // eslint-disable-next-line camelcase
  const { name_de } = await db.getWordClass(classId);

  return { id: classId, name_de };
}
