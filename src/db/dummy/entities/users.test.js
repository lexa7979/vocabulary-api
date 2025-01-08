const { getUUID } = require('../../../utils/dummyData');

const Users = require('./users');

const { ASYNC, bold, EXPECTS, IS_ACCESSIBLE, REJECTS, RESOLVES, copyObject } = require('../../../../test');

const Global = {};

describe(`Test-data service "users"`, () => {
    it(`has the expected exports`, () => {
        expect(Users).toEqual({
            getActiveWord: expect.any(Function),
            getUser: expect.any(Function),
            listAllActiveWordsOfUser: expect.any(Function),
            listAllUsers: expect.any(Function),
        });
    });

    runTestsAboutGetUser();
    runTestsAboutListAllUsers();

    runTestsAboutGetActiveWord();
    runTestsAboutListAllActiveWordsOfUser();
});

function runTestsAboutGetUser() {
    describe(`${_nextListHint()} has an ${ASYNC} function ${bold('getUser()')} which`, () => {
        const { getUser } = Users;

        it(IS_ACCESSIBLE, () => expect(getUser).toBeFunction());

        it(`${EXPECTS} one argument (userId)`, () => expect(getUser).toHaveLength(1));

        it(`- when used with valid ID - ${RESOLVES} as expected ${_nextSnapshotHint()}`, async () => {
            const result = await getUser(getUUID('user1'));

            const copy = copyObject(result, { replaceUUIDs: true, replaceTimestamps: true });
            expect(copy).toMatchSnapshot(`> user1 <`);
        });

        it(`- when used with invalid ID - ${REJECTS} as expected`, async () => {
            await expect(() => getUser(getUUID('invalid'))).rejects.toThrow('invalid ID');
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

            const copy = copyObject(result, { replaceUUIDs: true, replaceTimestamps: true });
            expect(copy).toMatchSnapshot(`> all users <`);
        });

        it(`- when used with argument "first" - ${RESOLVES} as expected`, async () => {
            const result = await listAllUsers(1, undefined);

            const copy = copyObject(result, { replaceUUIDs: true, replaceTimestamps: true });
            expect(copy.map(({ id }) => id)).toEqual([
                //
                '(ID:user1)',
            ]);
        });

        it(`- when used with argument "offset" - ${RESOLVES} as expected`, async () => {
            const result = await listAllUsers(undefined, 1);

            const copy = copyObject(result, { replaceUUIDs: true, replaceTimestamps: true });
            expect(copy.map(({ id }) => id)).toEqual([
                //
                '(ID:user2)',
            ]);
        });
    });
}

function runTestsAboutGetActiveWord() {
    describe(`${_nextListHint()} has an ${ASYNC} function ${bold('getActiveWord()')} which`, () => {
        const { getActiveWord } = Users;

        it(IS_ACCESSIBLE, () => expect(getActiveWord).toBeFunction());

        it(`${EXPECTS} one argument (activeWordId)`, () => expect(getActiveWord).toHaveLength(1));

        it(`- when used with valid ID - ${RESOLVES} as expected ${_nextSnapshotHint()}`, async () => {
            const result = await getActiveWord(getUUID('user1-activeWord1'));

            const copy = copyObject(result, { replaceUUIDs: true, replaceTimestamps: true });
            expect(copy).toMatchSnapshot(`> 1st activeWord of user1 <`);
        });

        it(`- when used with invalid ID - ${REJECTS} as expected`, async () => {
            await expect(() => getActiveWord(getUUID('invalid'))).rejects.toThrow('invalid ID');
        });
    });
}

function runTestsAboutListAllActiveWordsOfUser() {
    describe(`${_nextListHint()} has an ${ASYNC} function ${bold('listAllActiveWordsOfUser()')} which`, () => {
        const { listAllActiveWordsOfUser } = Users;

        it(IS_ACCESSIBLE, () => expect(listAllActiveWordsOfUser).toBeFunction());

        it(`${EXPECTS} one argument (userId)`, () => expect(listAllActiveWordsOfUser).toHaveLength(1));

        it(`- when used w/o arguments - ${RESOLVES} with empty array`, async () => {
            // @ts-ignore
            const result = await listAllActiveWordsOfUser();
            expect(result).toEqual([]);
        });

        it(`- when used with valid ID - ${RESOLVES} as expected ${_nextSnapshotHint()}`, async () => {
            const result1 = await listAllActiveWordsOfUser(getUUID('user1'));
            expect(result1).toBeArrayOfSize(2);

            const copy = copyObject(result1, { replaceUUIDs: true, replaceTimestamps: true });
            expect(copy).toMatchSnapshot(`> all active-words of user1 <`);

            const result2 = await listAllActiveWordsOfUser(getUUID('user2'));
            expect(result2).toBeArrayOfSize(0);
        });

        it(`- when used with valid ID and argument "first" - ${RESOLVES} as expected`, async () => {
            const result = await listAllActiveWordsOfUser(getUUID('user1'), 1, undefined);

            const copy = copyObject(result, { replaceUUIDs: true, replaceTimestamps: true });
            expect(copy.map(({ id }) => id)).toEqual([
                //
                '(ID:user1-activeWord1)',
            ]);
        });

        it(`- when used with valid ID and argument "offset" - ${RESOLVES} as expected`, async () => {
            const result = await listAllActiveWordsOfUser(getUUID('user1'), undefined, 1);

            const copy = copyObject(result, { replaceUUIDs: true, replaceTimestamps: true });
            expect(copy.map(({ id }) => id)).toEqual([
                //
                '(ID:user1-activeWord2)',
            ]);
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
