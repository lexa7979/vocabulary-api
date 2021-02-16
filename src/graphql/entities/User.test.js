const db = require('../../dummy-db');

const { getTestId, _testHelpers: TestIdHelpers } = require('../../dummy-db/testIds');

const { resolvers } = require('./User');

const context = { db };

const { ASYNC, bold, EXPECTS, IS_ACCESSIBLE, RESOLVES } = require('../../../test');

describe(`GraphQL entity ${bold('User')}`, () => {
  it(`has the expected resolvers`, () => {
    expect(resolvers).toMatchInlineSnapshot(`
      Object {
        "Query": Object {
          "user": [Function],
          "users": [Function],
        },
        "User": Object {
          "activeWords": [Function],
        },
      }
    `);
  });

  runTestsAboutQueryWithUser();
  runTestsAboutQueryWithUsers();

  runTestsAboutUserWithActiveWords();
});

function runTestsAboutQueryWithUser() {
  describe(`has an ${ASYNC} function ${bold('Query.user()')} which`, () => {
    const { user } = resolvers.Query;

    it(IS_ACCESSIBLE, () => expect(user).toBeFunction());

    it(`${EXPECTS} three arguments (parent, args, context)`, () => expect(user).toHaveLength(3));

    it(`- when used with user-ID in "args" - ${RESOLVES} as expected`, async () => {
      const parent = null;
      const args = { id: getTestId('user1') };

      const result = await user(parent, args, context);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchInlineSnapshot(`
        Object {
          "currStep": 8,
          "id": "(ID:user1)",
          "login": "user1",
          "name": "User 1",
        }
      `);
    });
  });
}

function runTestsAboutQueryWithUsers() {
  describe(`has an ${ASYNC} function ${bold('Query.users()')} which`, () => {
    const { users } = resolvers.Query;

    it(IS_ACCESSIBLE, () => expect(users).toBeFunction());

    it(`${EXPECTS} three arguments (parent, args, context)`, () => expect(users).toHaveLength(3));

    it(`- when used with "first" and "offset" in "args" - ${RESOLVES} as expected`, async () => {
      const parent = null;
      const args = { first: 1, offset: 1 };

      const result = await users(parent, args, context);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchInlineSnapshot(`
        Array [
          Object {
            "id": "(ID:user2)",
            "login": "user2",
            "name": "User 2",
          },
        ]
      `);
    });
  });
}

function runTestsAboutUserWithActiveWords() {
  describe(`has an ${ASYNC} function ${bold('User.activeWords()')} which`, () => {
    const { activeWords } = resolvers.User;

    it(IS_ACCESSIBLE, () => expect(activeWords).toBeFunction());

    it(`${EXPECTS} three arguments (parent, args, context)`, () =>
      expect(activeWords).toHaveLength(3));

    it(`- when used with user-ID in "parent", "first" and "offset" in "args" - ${RESOLVES} as expected`, async () => {
      const parent = { id: getTestId('user1') };
      const args = { first: 1, offset: 1 };

      const result = await activeWords(parent, args, context);

      const copy = TestIdHelpers.copyObjectButReplaceUUIDs(result);
      expect(copy).toMatchInlineSnapshot(`
        Array [
          Object {
            "id": "(ID:word3)",
          },
        ]
      `);
    });
  });
}
