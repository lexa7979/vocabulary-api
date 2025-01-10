// jest.mock('./index');
// const DummyDB = jest.requireActual('./index');
// const DummyDBMockup = jest.requireMock('./index');

const { copyObject } = require('../../../test');

const DummyDB = require('./index');

describe('Dummy-DB API', () => {
    it('has all expected exports', () => {
        expect(copyObject(DummyDB, { replaceFunctions: true })).toEqual({
            getActiveWord: '(FUNC:getActiveWord)',
            getFlection: '(FUNC:getFlection)',
            getTranslation: '(FUNC:getTranslation)',
            getUser: '(FUNC:getUser)',
            getWord: '(FUNC:getWord)',
            getWordClass: '(FUNC:getWordClass)',
            getWordClassWithFlections: '(FUNC:getWordClassWithFlections)',
            getWordWithTranslations: '(FUNC:getWordWithTranslations)',
            init: '(FUNC:init)',
            insertActiveWord: '(FUNC:insertActiveWord)',
            insertFlection: '(FUNC:insertFlection)',
            insertTranslation: '(FUNC:insertTranslation)',
            insertUser: '(FUNC:insertUser)',
            insertWord: '(FUNC:insertWord)',
            insertWordClass: '(FUNC:insertWordClass)',
            insertWordClassWithFlections: '(FUNC:insertWordClassWithFlections)',
            insertWordWithTranslations: '(FUNC:insertWordWithTranslations)',
            listAllActiveWordsOfUser: '(FUNC:listAllActiveWordsOfUser)',
            listAllFlectionsOfWordClass: '(FUNC:listAllFlectionsOfWordClass)',
            listAllTranslationsOfWord: '(FUNC:listAllTranslationsOfWord)',
            listAllUsers: '(FUNC:listAllUsers)',
            listAllWordClasses: '(FUNC:listAllWordClasses)',
            listAllWords: '(FUNC:listAllWords)',
            updateActiveWord: '(FUNC:updateActiveWord)',
            updateFlection: '(FUNC:updateFlection)',
            updateTranslation: '(FUNC:updateTranslation)',
            updateUser: '(FUNC:updateUser)',
            updateWord: '(FUNC:updateWord)',
            updateWordClass: '(FUNC:updateWordClass)',
            updateWordClassWithFlections: '(FUNC:updateWordClassWithFlections)',
            updateWordWithTranslations: '(FUNC:updateWordWithTranslations)',
        });
    });

    it(`has exports with the expected number of arguments`, () => {
        expect(_getNumberOfArgumentsOfEveryFunction(DummyDB)).toEqual({
            getActiveWord: 1,
            getFlection: 1,
            getTranslation: 1,
            getUser: 1,
            getWord: 1,
            getWordClass: 1,
            getWordClassWithFlections: 1,
            getWordWithTranslations: 1,
            init: 0,
            insertActiveWord: 0,
            insertFlection: 0,
            insertTranslation: 0,
            insertUser: 0,
            insertWord: 0,
            insertWordClass: 0,
            insertWordClassWithFlections: 0,
            insertWordWithTranslations: 0,
            listAllActiveWordsOfUser: 1,
            listAllFlectionsOfWordClass: 1,
            listAllTranslationsOfWord: 1,
            listAllUsers: 0,
            listAllWordClasses: 0,
            listAllWords: 0,
            updateActiveWord: 0,
            updateFlection: 0,
            updateTranslation: 0,
            updateUser: 0,
            updateWord: 0,
            updateWordClass: 0,
            updateWordClassWithFlections: 0,
            updateWordWithTranslations: 0,
        });
    });

    // it.skip(`has a mockup with equal exports`, () => {
    //   const actualExports = Object.keys(DummyDB).sort();
    //   const mockupExports = Object.keys(DummyDBMockup).sort();
    //   expect(actualExports).toEqual(mockupExports);

    //   const num1 = _getNumberOfArgumentsOfEveryFunction(DummyDB);
    //   const num2 = _getNumberOfArgumentsOfEveryFunction(DummyDBMockup);
    //   expect(num1).toEqual(num2);
    // });
});

function _getNumberOfArgumentsOfEveryFunction(input) {
    const result = {};
    const funcNames = Object.keys(input)
        .filter(key => typeof input[key] === 'function')
        .sort();
    funcNames.forEach(key => {
        result[key] = input[key].length;
    });
    return result;
}
