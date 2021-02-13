const db = require('../../dummy-db');
const { getTestId } = require('../../dummy-db/testIds');

const { resolvers } = require('./WordClass');

const { bold, RESOLVES, ASYNC } = require('../../../test');

const context = { db };
const info = null;

describe(`has an ${ASYNC} function ${bold('Query.wordClasses()')} that`, () => {
  const { wordClasses } = resolvers.Query;

  it(`- when used with a valid ID - ${RESOLVES} as expected`, async () => {
    const parent = null;
    const args = { first: 2, offset: 2 };

    const result = await wordClasses(parent, args, context, info);

    expect(result).toEqual([{ id: getTestId('adjective'), name_de: 'Adjektiv' }]);
  });
});
