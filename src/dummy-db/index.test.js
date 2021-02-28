// jest.mock('./index');
// const DummyDB = jest.requireActual('./index');
// const DummyDBMockup = jest.requireMock('./index');

const DummyDB = require('./index');

describe('Dummy-DB API', () => {
  it('has all expected exports', () => {
    expect(DummyDB).toMatchInlineSnapshot(`
      Object {
        "getActiveWord": [Function],
        "getFlection": [Function],
        "getTranslation": [Function],
        "getUser": [Function],
        "getWord": [Function],
        "getWordClass": [Function],
        "getWordClassWithFlections": [Function],
        "getWordWithTranslations": [Function],
        "listAllActiveWordsOfUser": [Function],
        "listAllFlectionsOfWordClass": [Function],
        "listAllTranslationsOfWord": [Function],
        "listAllUsers": [Function],
        "listAllWordClasses": [Function],
        "listAllWords": [Function],
      }
    `);
  });

  it(`has exports with the expected number of arguments`, () => {
    expect(_getNumberOfArgumentsOfEveryFunction(DummyDB)).toMatchInlineSnapshot(`
      Object {
        "getActiveWord": 1,
        "getFlection": 1,
        "getTranslation": 1,
        "getUser": 1,
        "getWord": 1,
        "getWordClass": 1,
        "getWordClassWithFlections": 1,
        "getWordWithTranslations": 1,
        "listAllActiveWordsOfUser": 1,
        "listAllFlectionsOfWordClass": 1,
        "listAllTranslationsOfWord": 1,
        "listAllUsers": 0,
        "listAllWordClasses": 0,
        "listAllWords": 0,
      }
    `);
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
