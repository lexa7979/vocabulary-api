const db = require('../../data');
const getTestId = require('../../data/getTestId');

const { resolvers } = require('./Word');

const { bold, RESOLVES, ASYNC } = require('../../../test');

const context = { db };
const info = null;

describe(`has an ${ASYNC} function ${bold('Query.word()')} that`, () => {
  const { word } = resolvers.Query;

  it(`- when used with a valid ID - ${RESOLVES} as expected`, async () => {
    const parent = null;
    const args = { id: getTestId('word3') };

    const result = await word(parent, args, context, info);

    expect(result).toEqual({ id: getTestId('word3') });
  });
});

describe(`has an ${ASYNC} function ${bold('Query.words')} that`, () => {
  const { words } = resolvers.Query;

  it(`- when used with a valid ID - ${RESOLVES} as expected`, async () => {
    const parent = null;
    const args = { first: 2, offset: 1 };

    const result = await words(parent, args, context, info);

    expect(result).toEqual([{ id: getTestId('word2') }, { id: getTestId('word3') }]);
  });
});
