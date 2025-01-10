const { bold, EXPECTS } = require('../../../../test');
const ReadUsers = require('./users');

describe('Mongo-DB service "read-users"', () => {
    it('has the expected exports', () => {
        expect(ReadUsers).toEqual({
            getUser: expect.any(Function),
            listAllUsers: expect.any(Function),
            getActiveWord: expect.any(Function),
            listAllActiveWordsOfUser: expect.any(Function),
        });
    });

    runTestsAboutGetUser();
    runTestsAboutListAllUsers();
    runTestsAboutGetActiveWord();
    runTestsAboutListAllActiveWordsOfUser();
});

function runTestsAboutGetUser() {
    describe(`exports a function ${bold('getUser()')} which`, () => {
        it(`${EXPECTS} one argument (userId)`, () => expect(ReadUsers.getUser).toHaveLength(1));
    });
}

function runTestsAboutListAllUsers() {}

function runTestsAboutGetActiveWord() {}

function runTestsAboutListAllActiveWordsOfUser() {}
