const getTestId = require('./getTestId');

const WordClasses = require('./wordClasses');

const { bold, green, RESOLVES, REJECTS, IS_ACCESSIBLE, EXPECTS } = require('../../test');

describe('Test-data service "WordClasses"', () => {
  runTestsAboutGetWordClass();
  runTestsAboutGetWordClassWithFlections();
  runTestsAboutListAllWordClasses();
});

function runTestsAboutGetWordClass() {
  describe(`has an ${bold('async')} function ${bold('getWordClass()')} which`, () => {
    const { getWordClass } = WordClasses;

    it(green('is accessible'), () => {
      expect(getWordClass).toBeFunction();
    });

    it(`${green('expects')} one argument (id)`, () => {
      expect(getWordClass.length).toBe(1);
    });

    it(`- when used w/o arguments - ${REJECTS} as expected`, async () => {
      await expect(getWordClass).rejects.toThrow('invalid ID');
    });

    it(`- when used with valid ID - ${RESOLVES} with data-object`, async () => {
      const id = getTestId('verb');

      const wordClass = await getWordClass(id);

      expect(wordClass).toEqual({ id, name_de: 'Verb' });
    });
  });
}

function runTestsAboutGetWordClassWithFlections() {
  describe(`has an ${bold('async')} function ${bold('getWordClassWithFlections()')} which`, () => {
    const { getWordClassWithFlections } = WordClasses;

    it(green('is accessible'), () => {
      expect(getWordClassWithFlections).toBeFunction();
    });

    it(`${green('expects')} one argument (id)`, () => {
      expect(getWordClassWithFlections.length).toBe(1);
    });

    it(`- when used w/o arguments - ${REJECTS} as expected`, async () => {
      await expect(getWordClassWithFlections).rejects.toThrow('invalid ID');
    });

    it(`- when used with valid ID - ${RESOLVES} with data-object`, async () => {
      const classId = getTestId('verb');

      // eslint-disable-next-line camelcase
      const { id, name_de, flections } = await getWordClassWithFlections(classId);

      expect({ id, name_de }).toEqual({
        id: classId,
        name_de: 'Verb',
      });

      expect(
        flections.map(item => ({
          classId: item.classId,
          pos: item.pos,
          name_de: item.name_de,
        }))
      ).toEqual([
        { classId, pos: 0, name_de: 'Infinitiv' },
        { classId, pos: 1, name_de: 'Präsens' },
        { classId, pos: 2, name_de: 'Präteritum' },
        { classId, pos: 3, name_de: 'Perfekt' },
        { classId, pos: 4, name_de: 'Imperativ' },
      ]);
    });
  });
}

function runTestsAboutListAllWordClasses() {
  describe(`has an ${bold('async')} function ${bold('listAllWordClassIds()')} which`, () => {
    const { listAllWordClasses } = WordClasses;

    it(IS_ACCESSIBLE, () => expect(listAllWordClasses).toBeFunction());

    it(`${EXPECTS} no argument`, () => expect(listAllWordClasses).toHaveLength(0));

    it(`- when used w/o arguments - ${RESOLVES} with data-array`, async () => {
      const result = await listAllWordClasses();

      expect(result).toEqual([
        { id: getTestId('verb'), name_de: 'Verb' },
        { id: getTestId('noun'), name_de: 'Substantiv' },
        { id: getTestId('adjective'), name_de: 'Adjektiv' },
      ]);
    });

    it(`- when used with arguments "first" and "offset" - ${RESOLVES} as expected`, async () => {
      const result = await listAllWordClasses(1, 1);

      expect(result).toEqual([{ id: getTestId('noun'), name_de: 'Substantiv' }]);
    });
  });
}
