const seedrandom = require('seedrandom');

const getNextLearnSteps = require('./getNextLearnSteps');

const { getHelperClass } = getNextLearnSteps._testInternals;

const { DbMockup, DB_MOCKUP_USERID } = require('./getNextLearnSteps.test-data');

const { bold, EXPECTS, FAILS, IS_ACCESSIBLE, RETURNS, WORKS, copyObject } = require('../../test');

describe(`Learning utility ${bold('getNextLearnSteps()')}`, () => {
  beforeEach(() => seedrandom('fixed entropy', { global: true }));

  it(IS_ACCESSIBLE, () => expect(getNextLearnSteps).toBeFunction());

  it(`${EXPECTS} one argument (activeWords)`, () => expect(getNextLearnSteps).toHaveLength(1));

  it(`${RETURNS} a Promise`, async () => {
    // @ts-ignore
    const resultSync = getNextLearnSteps();
    expect(resultSync).toBeInstanceOf(Promise);
    await expect(resultSync).rejects.toThrow();
  });

  it(`- when used w/o arguments - ${FAILS} as expected`, () =>
    expect(getNextLearnSteps).rejects.toThrow('missing arguments'));

  it(`- when used with valid arguments - ${WORKS} as expected`, async () => {
    // await getNextLearnSteps({
    //   db: DbMockup,
    //   userId: DB_MOCKUP_USERID,
    //   nextStepsCount: 5,
    // });

    seedrandom('fixed entropy', { global: true });

    const NextLearnStepsFinder = getHelperClass();
    const helper = new NextLearnStepsFinder({
      db: DbMockup,
      userId: DB_MOCKUP_USERID,
      nextStepsCount: 25,
    });

    await helper.process();

    expect(copyObject(helper, { replaceAllSpecials: true }).newLearnSteps).toMatchInlineSnapshot(`
      Array [
        Object {
          "flectionId": "(ID:flection1)",
          "result": null,
          "step": 14,
          "wordId": "(ID:word14)",
        },
        Object {
          "flectionId": "(ID:flection2)",
          "result": null,
          "step": 15,
          "wordId": "(ID:word17)",
        },
        Object {
          "flectionId": "(ID:flection2)",
          "result": null,
          "step": 16,
          "wordId": "(ID:word5)",
        },
        Object {
          "flectionId": "(ID:flection1)",
          "result": null,
          "step": 17,
          "wordId": "(ID:word7)",
        },
        Object {
          "flectionId": "(ID:flection2)",
          "result": null,
          "step": 18,
          "wordId": "(ID:word3)",
        },
        Object {
          "flectionId": "(ID:flection1)",
          "result": null,
          "step": 19,
          "wordId": "(ID:word4)",
        },
        Object {
          "flectionId": "(ID:flection1)",
          "result": null,
          "step": 20,
          "wordId": "(ID:word9)",
        },
        Object {
          "flectionId": "(ID:flection2)",
          "result": null,
          "step": 21,
          "wordId": "(ID:word1)",
        },
        Object {
          "flectionId": "(ID:flection2)",
          "result": null,
          "step": 22,
          "wordId": "(ID:word2)",
        },
        Object {
          "flectionId": "(ID:flection1)",
          "result": null,
          "step": 23,
          "wordId": "(ID:word10)",
        },
        Object {
          "flectionId": "(ID:flection3)",
          "result": null,
          "step": 24,
          "wordId": "(ID:word6)",
        },
        Object {
          "flectionId": "(ID:flection3)",
          "result": null,
          "step": 25,
          "wordId": "(ID:word8)",
        },
        Object {
          "flectionId": "(ID:flection3)",
          "result": null,
          "step": 26,
          "wordId": "(ID:word15)",
        },
        Object {
          "flectionId": "(ID:flection2)",
          "result": null,
          "step": 27,
          "wordId": "(ID:word16)",
        },
      ]
    `);
  });
});
