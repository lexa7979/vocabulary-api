const { bold, green, IS_ACCESSIBLE, EXPECTS, FAILS, RETURNS, red } = require('./colors');

const Copy = require('./copy');

describe(`Test utility "Copy"`, () => {
    it(`has the expected exports`, () => {
        expect(Copy).toMatchInlineSnapshot(`
{
  "_testInternals": {
    "listReplaceActions": [Function],
    "resetReplaceActions": [Function],
  },
  "copyObject": [Function],
  "registerReplaceAction": [Function],
}
`);
    });

    it(`has one replace-action (named "replaceFunctions") by default`, () => {
        Copy._testInternals.resetReplaceActions();
        expect(Copy._testInternals.listReplaceActions()).toMatchInlineSnapshot(`
{
  "replaceFunctions": [Function],
}
`);
    });

    runTestsAboutCopyObject();

    runTestsAboutRegisterReplaceAction();
});

function runTestsAboutCopyObject() {
    describe(`has a function ${bold('copyObject()')} which`, () => {
        const { copyObject } = Copy;

        const testInput = {
            str: 'testString1',
            num: 179,
            arr: ['testString2', ['testString3', jest.fn(), jest.fn(), () => {}]],
            obj: { name: 'testString4', sub: { func: function testFunction() {}, mock: jest.fn() } },
        };

        it(IS_ACCESSIBLE, () => expect(copyObject).toBeFunction());

        it(`${EXPECTS} one argument (input)`, () => expect(copyObject).toHaveLength(1));

        it(`- when used w/o arguments - ${RETURNS} undefined`, () => expect(copyObject()).toBeUndefined());

        it(`- when "input" is a Promise - ${FAILS} as expected`, async () => {
            const test = new Promise(resolve => resolve());

            expect(() => copyObject(test)).toThrow("won't process a Promise");

            await test;
        });

        it(`- when used with "input" - ${RETURNS} a deep-copy`, () => {
            const result = copyObject(testInput);

            expect(result).not.toBe(testInput);
            expect(result).toEqual(testInput);
            expect(result.obj).not.toBe(testInput.obj);
        });

        it(`- when "input" includes a circular reference - ${green('replaces')} the reference with a string`, () => {
            const obj = {
                a: {},
            };
            obj.a.ref = obj;

            expect(copyObject(obj)).toEqual({
                a: { ref: '(circular)' },
            });
        });

        it(`- when used with option "replaceFunctions" - ${green('replaces')} all functions with strings`, () => {
            // @ts-ignore
            testInput.arr[1][1](1, 2, 3);

            function testFunctionWithProps() {}
            testFunctionWithProps.testProp1 = 'testString';
            testFunctionWithProps.testProp2 = jest.fn();
            testFunctionWithProps.testProp2('testArgument1');
            testFunctionWithProps.testProp3 = () => {};
            // @ts-ignore
            testInput.arr.push(testFunctionWithProps);

            const result = copyObject(testInput, { replaceFunctions: true });
            expect(result).toMatchInlineSnapshot(`
{
  "arr": [
    "testString2",
    [
      "testString3",
      "(MOCK:1 call)",
      "(MOCK:0 calls)",
      "(FUNC:anonymous)",
    ],
    {
      "_self": "(FUNC:testFunctionWithProps)",
      "props": {
        "testProp1": "testString",
        "testProp2": "(MOCK:1 call)",
        "testProp3": "(FUNC:anonymous)",
      },
    },
  ],
  "num": 179,
  "obj": {
    "name": "testString4",
    "sub": {
      "func": "(FUNC:testFunction)",
      "mock": "(MOCK:0 calls)",
    },
  },
  "str": "testString1",
}
`);
        });

        it(`- when used with option "replaceFunctions" - ${green('does not change')} "input"`, () => {
            copyObject(testInput, { replaceFunctions: true });

            expect(testInput).toMatchInlineSnapshot(`
{
  "arr": [
    "testString2",
    [
      "testString3",
      [MockFunction],
      [MockFunction],
      [Function],
    ],
    [Function],
  ],
  "num": 179,
  "obj": {
    "name": "testString4",
    "sub": {
      "func": [Function],
      "mock": [MockFunction],
    },
  },
  "str": "testString1",
}
`);
        });

        it(`- when used with unknown option - ${FAILS} as expected`, () => {
            Copy._testInternals.resetReplaceActions();

            expect(() => copyObject(testInput, { replaceUnknown: true })).toThrow('unknown option');
        });
    });
}

function runTestsAboutRegisterReplaceAction() {
    describe(`has a function ${bold('registerReplaceAction()')} which`, () => {
        const { registerReplaceAction } = Copy;

        const optionName = 'replaceTest';
        const replaceCallback = jest.fn();

        it(IS_ACCESSIBLE, () => expect(registerReplaceAction).toBeFunction());

        it(`${EXPECTS} two arguments (optionName, replaceCallback)`, () =>
            expect(registerReplaceAction).toHaveLength(2));

        it(`- when used w/o arguments - ${FAILS} as expected`, () =>
            expect(registerReplaceAction).toThrow('invalid argument'));

        it(`- when used w/o "optionsName" - ${FAILS} as expected`, () =>
            expect(() => registerReplaceAction(undefined, replaceCallback)).toThrow('invalid argument'));

        it(`- when used w/o "replaceCallback" - ${FAILS} as expected`, () =>
            expect(() => registerReplaceAction(optionName, undefined)).toThrow('invalid argument'));

        it(`- when used with "optionsName" and "replaceCallback" - ${RETURNS} true`, () => {
            Copy._testInternals.resetReplaceActions();

            const result = registerReplaceAction(optionName, replaceCallback);
            expect(result).toBeTrue();
        });

        it(`- when used with "optionsName" and "replaceCallback" - ${green('memorizes')} new action`, () => {
            Copy._testInternals.resetReplaceActions();

            const actionsBefore = Copy._testInternals.listReplaceActions();
            expect(actionsBefore).toBeObject();
            expect(actionsBefore[optionName]).toBeUndefined();

            const result = registerReplaceAction(optionName, replaceCallback);
            expect(result).toBeTrue();

            const actionsAfter = Copy._testInternals.listReplaceActions();
            expect(actionsAfter).toBeObject();
            expect(actionsAfter[optionName]).toBe(replaceCallback);
        });

        it(`- when used a second time with same arguments - ${red('IGNORES')} new action and ${RETURNS} false`, () => {
            Copy._testInternals.resetReplaceActions();

            registerReplaceAction(optionName, replaceCallback);

            const secondReplaceCallback = jest.fn();
            const result2 = registerReplaceAction(optionName, secondReplaceCallback);
            expect(result2).toBeFalse();

            const actions = Copy._testInternals.listReplaceActions();
            expect(actions[optionName]).toBe(replaceCallback);
            expect(actions[optionName]).not.toBe(secondReplaceCallback);
        });

        it(`- when trying to overwrite default action "replaceFunctions" - ${green(
            'keeps'
        )} original action and ${green('returns')} false`, () => {
            const actionsBefore = Copy._testInternals.listReplaceActions();
            expect(actionsBefore).toContainKey('replaceFunctions');
            const callbackBefore = actionsBefore.replaceFunctions;

            const result = registerReplaceAction('replaceFunctions', replaceCallback);
            expect(result).toBeFalse();

            const actionsAfter = Copy._testInternals.listReplaceActions();
            expect(actionsAfter).toContainKey('replaceFunctions');
            expect(actionsAfter.replaceFunctions).toBe(callbackBefore);
        });
    });
}
