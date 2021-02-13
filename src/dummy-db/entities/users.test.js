const { getTestId, _testHelpers: TestIdHelpers } = require('../testIds');

const Users = require('./users');

const { ASYNC, bold, EXPECTS, IS_ACCESSIBLE, REJECTS, RESOLVES } = require('../../../test');

const Global = {};

describe(`Test-data service "users"`, () => {
  runTestsAboutGetUser();
  runTestsAboutListAllUsers();
  runTestsAboutGetActiveWord();
  runTestsAboutListAllActiveWordsOfUser();
});

function runTestsAboutGetUser() {
  describe(`${_nextListHint()} has an ${ASYNC} function ${bold('getUser()')} which`, () => {
    const { getUser } = Users;

    it(IS_ACCESSIBLE, () => expect(getUser).toBeFunction());

    it(`${EXPECTS} one argument (id)`, () => expect(getUser).toHaveLength(1));

    it(`- when used with valid user-ID - ${RESOLVES} as expected ${_nextSnapshotHint()}`, async () => {
      const result = await getUser(getTestId('user1'));

      const copy = TestIdHelpers.copyObjectButRemoveUUIDs(result);
      expect(copy).toMatchSnapshot(`> user1 <`);
    });

    it(`- when used with an invalid user-ID - ${REJECTS} as expected`, async () => {
      await expect(() => getUser(getTestId('invalid'))).rejects.toThrow('invalid ID');
    });
  });
}

function runTestsAboutListAllUsers() {
  describe(`${_nextListHint()} has an ${ASYNC} function ${bold('listAllUsers()')} which`, () => {
    const { listAllUsers } = Users;

    it(IS_ACCESSIBLE, () => expect(listAllUsers).toBeFunction());

    it(`${EXPECTS} no arguments`, () => expect(listAllUsers).toHaveLength(0));

    it(`- when used w/o arguments - ${RESOLVES} as expected ${_nextSnapshotHint()}`, async () => {
      const result = await listAllUsers();

      const copy = TestIdHelpers.copyObjectButRemoveUUIDs(result);
      expect(copy).toMatchSnapshot(`> all users <`);
    });

    it(`- when used with argument "first" - ${RESOLVES} as expected`, async () => {
      const result = await listAllUsers(1, undefined);

      const copy = TestIdHelpers.copyObjectButRemoveUUIDs(result).map(item => item.id);
      expect(copy).toMatchInlineSnapshot(`
        Array [
          "(ID:user1)",
        ]
      `);
    });

    it(`- when used with argument "offset" - ${RESOLVES} as expected`, async () => {
      const result = await listAllUsers(undefined, 1);

      const copy = TestIdHelpers.copyObjectButRemoveUUIDs(result).map(item => item.id);
      expect(copy).toMatchInlineSnapshot(`
        Array [
          "(ID:user2)",
        ]
      `);
    });
  });
}

function runTestsAboutGetActiveWord() {
  describe(`${_nextListHint()} has an ${ASYNC} function ${bold('getActiveWord()')} which`, () => {
    const { getActiveWord } = Users;

    it(IS_ACCESSIBLE, () => expect(getActiveWord).toBeFunction());

    it(`${EXPECTS} one argument (activeWordId)`, () => expect(getActiveWord).toHaveLength(1));

    it(`- when used with valid ID - ${RESOLVES} as expected ${_nextSnapshotHint()}`, async () => {
      const result = await getActiveWord(getTestId('user1-activeWord1'));

      const copy = TestIdHelpers.copyObjectButRemoveUUIDs(result);
      expect(copy).toMatchSnapshot(`> user1-activeWord1 <`);
    });

    it(`- when used with invalid ID - ${REJECTS} as expected`, async () => {
      await expect(() => getActiveWord(getTestId('invalid'))).rejects.toThrow('invalid ID');
    });
  });
}

function runTestsAboutListAllActiveWordsOfUser() {
  describe(`${_nextListHint()} has an ${ASYNC} function ${bold(
    'listAllActiveWordsOfUser()'
  )} which`, () => {
    const { listAllActiveWordsOfUser } = Users;

    it(IS_ACCESSIBLE, () => expect(listAllActiveWordsOfUser).toBeFunction());

    it(`${EXPECTS} one argument (userId)`, () => expect(listAllActiveWordsOfUser).toHaveLength(1));

    it(`- when used w/o arguments - ${RESOLVES} with empty array`, async () => {
      const result = await listAllActiveWordsOfUser();
      expect(result).toEqual([]);
    });

    it(`- when used with valid user-ID - ${RESOLVES} as expected ${_nextSnapshotHint()}`, async () => {
      const result1 = await listAllActiveWordsOfUser(getTestId('user1'));
      expect(result1).toBeArrayOfSize(2);

      const result2 = await listAllActiveWordsOfUser(getTestId('user2'));
      expect(result2).toBeArrayOfSize(0);

      const copy = TestIdHelpers.copyObjectButRemoveUUIDs(result1);
      expect(copy).toMatchSnapshot(`> all active-words of user1 <`);
    });

    it(`- when used with valid user-ID and argument "first" - ${RESOLVES} as expected`, async () => {
      const result = await listAllActiveWordsOfUser(getTestId('user1'), 1, undefined);

      const copy = TestIdHelpers.copyObjectButRemoveUUIDs(result).map(item => item.id);
      expect(copy).toMatchInlineSnapshot(`
        Array [
          "(ID:user1-activeWord1)",
        ]
      `);
    });

    it(`- when used with valid user-ID and argument "offset" - ${RESOLVES} as expected`, async () => {
      const result = await listAllActiveWordsOfUser(getTestId('user1'), undefined, 1);

      const copy = TestIdHelpers.copyObjectButRemoveUUIDs(result).map(item => item.id);
      expect(copy).toMatchInlineSnapshot(`
        Array [
          "(ID:user1-activeWord2)",
        ]
      `);
    });
  });
}

function _nextListHint() {
  Global.nextListItemId = Global.nextListItemId == null ? 1 : Global.nextListItemId + 1;
  return `(${Global.nextListItemId})`;
}

function _nextSnapshotHint() {
  Global.nextSnapshotId = Global.nextSnapshotId == null ? 1 : Global.nextSnapshotId + 1;
  return `[-> check snapshot ${Global.nextSnapshotId}]`;
}
