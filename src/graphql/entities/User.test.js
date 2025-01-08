const db = require('../../db/dummy');

const { getUUID } = require('../../utils/dummyData');

const { resolvers } = require('./User');

const context = { db };

const { ASYNC, bold, EXPECTS, IS_ACCESSIBLE, RESOLVES, copyObject } = require('../../../test');

describe(`GraphQL entity ${bold('User')}`, () => {
    it(`has the expected resolvers`, () => {
        expect(copyObject(resolvers, { replaceFunctions: true })).toEqual({
            Query: {
                user: '(FUNC:user)',
                users: '(FUNC:users)',
            },
            User: {
                activeWords: '(FUNC:activeWordsOfUser)',
            },
        });
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
            const args = { id: getUUID('user1') };

            const result = await user(parent, args, context);

            expect(copyObject(result, { replaceUUIDs: true })).toEqual({
                currStep: 8,
                id: '(ID:user1)',
                login: 'user1',
                name: 'User 1',
            });
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

            expect(copyObject(result, { replaceUUIDs: true })).toEqual([
                { id: '(ID:user2)', login: 'user2', name: 'User 2' },
            ]);
        });
    });
}

function runTestsAboutUserWithActiveWords() {
    describe(`has an ${ASYNC} function ${bold('User.activeWords()')} which`, () => {
        const { activeWords } = resolvers.User;

        it(IS_ACCESSIBLE, () => expect(activeWords).toBeFunction());

        it(`${EXPECTS} three arguments (parent, args, context)`, () => expect(activeWords).toHaveLength(3));

        it(`- when used with user-ID in "parent", "first" and "offset" in "args" - ${RESOLVES} as expected`, async () => {
            const parent = { id: getUUID('user1') };
            const args = { first: 1, offset: 1 };

            const result = await activeWords(parent, args, context);

            expect(copyObject(result, { replaceUUIDs: true })).toEqual([
                //
                { id: '(ID:word3)' },
            ]);
        });
    });
}
