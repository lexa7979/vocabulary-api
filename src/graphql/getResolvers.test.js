const db = require('../data');
const getTestId = require('../data/getTestId');

const getResolvers = require('./getResolvers');

const { bold, green, IS_ACCESSIBLE, EXPECTS, RETURNS, RESOLVES, ASYNC } = require('../../test');

describe(`Function ${bold('getResolvers()')}`, () => {
  it(IS_ACCESSIBLE, () => expect(getResolvers).toBeFunction());

  it(`${EXPECTS} no argument`, () => expect(getResolvers).toHaveLength(0));

  describe(`${RETURNS} an object which`, () => {
    const resolvers = getResolvers();

    const context = { db };
    const info = null;

    it(`${green('contains')} the expected properties`, () => {
      expect(resolvers).toMatchInlineSnapshot(`
        Object {
          "Flection": Object {
            "wordClass": [Function],
          },
          "Query": Object {
            "word": [Function],
            "wordClasses": [Function],
            "words": [Function],
          },
          "Translation": Object {
            "flection": [Function],
            "word": [Function],
          },
          "UUID": "UUID",
          "User": Object {
            "activeWords": [Function],
          },
          "Word": Object {
            "translations": [Function],
            "wordClass": [Function],
          },
          "WordClass": Object {
            "flections": [Function],
          },
        }
      `);
    });

    describe(`has an ${ASYNC} function ${bold('Query.word()')} that`, () => {
      const { word } = resolvers.Query;

      it(`- when used with a valid ID - ${RESOLVES} as expected`, async () => {
        const parent = null;
        const args = { id: getTestId('word3') };

        const result = await word(parent, args, context, info);

        expect(result).toEqual({ id: getTestId('word3') });
      });
    });

    describe(`has an ${ASYNC} function ${bold('Query.wordClasses()')} that`, () => {
      const { wordClasses } = resolvers.Query;

      it(`- when used with a valid ID - ${RESOLVES} as expected`, async () => {
        const parent = null;
        const args = { first: 2, offset: 2 };

        const result = await wordClasses(parent, args, context, info);

        expect(result).toEqual([{ id: getTestId('adjective'), name_de: 'Adjektiv' }]);
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
  });
});
