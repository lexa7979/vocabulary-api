const { allTypeDefs, allResolvers } = require('./index');

const { bold } = require('../../../test');

describe(`Array ${bold('allTypeDefs')}`, () => {
  it(`has the expected content`, () => {
    expect(allTypeDefs).toContainAllKeys(['Basics', 'WordClass', 'Word', 'User']);
    Object.values(allTypeDefs).forEach(item => {
      expect(item).toContainAllKeys(['definitions', 'kind', 'loc']);
      expect(item.definitions).toBeArray();
    });

    expect(
      Object.keys(allTypeDefs).map(key => ({
        key,
        numDefinitions: allTypeDefs[key].definitions.length,
      }))
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "key": "Basics",
          "numDefinitions": 1,
        },
        Object {
          "key": "WordClass",
          "numDefinitions": 3,
        },
        Object {
          "key": "Word",
          "numDefinitions": 3,
        },
        Object {
          "key": "User",
          "numDefinitions": 2,
        },
      ]
    `);
  });
});

describe(`Array ${bold('allResolvers')}`, () => {
  it(`has the expected content`, () => {
    expect(allResolvers).toMatchInlineSnapshot(`
      Object {
        "Basics": Object {
          "UUID": "UUID",
        },
        "User": Object {
          "Query": Object {
            "user": [Function],
            "users": [Function],
          },
          "User": Object {
            "activeWords": [Function],
          },
        },
        "Word": Object {
          "Query": Object {
            "word": [Function],
            "words": [Function],
          },
          "Translation": Object {
            "flection": [Function],
            "word": [Function],
          },
          "Word": Object {
            "translations": [Function],
            "wordClass": [Function],
          },
        },
        "WordClass": Object {
          "Flection": Object {
            "wordClass": [Function],
          },
          "Query": Object {
            "wordClass": [Function],
            "wordClasses": [Function],
          },
          "WordClass": Object {
            "flections": [Function],
          },
        },
      }
    `);
  });
});
