const getResolvers = require('./getResolvers');

const { bold, green, IS_ACCESSIBLE, EXPECTS, RETURNS } = require('../../test');

describe(`Function ${bold('getResolvers()')}`, () => {
  it(IS_ACCESSIBLE, () => expect(getResolvers).toBeFunction());

  it(`${EXPECTS} no argument`, () => expect(getResolvers).toHaveLength(0));

  describe(`${RETURNS} an object which`, () => {
    const resolvers = getResolvers();

    it(`${green('contains')} the expected properties`, () => {
      expect(resolvers).toMatchInlineSnapshot(`
        Object {
          "Flection": Object {
            "wordClass": [Function],
          },
          "Query": Object {
            "user": [Function],
            "users": [Function],
            "word": [Function],
            "wordClass": [Function],
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
  });
});
