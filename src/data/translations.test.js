const getTestId = require('./getTestId');
const Translations = require('./translations');

const { IS_ACCESSIBLE, EXPECTS, RESOLVES, REJECTS } = require('../../test');

describe('Test-data service "translations"', () => {
  describe('has an async function getTranslation() which', () => {
    const { getTranslation } = Translations;

    it(IS_ACCESSIBLE, () => expect(getTranslation).toBeFunction());

    it(`${EXPECTS} one argument (id)`, () => expect(getTranslation).toHaveLength(1));

    it(`- when used with a valid ID - ${RESOLVES} with translation`, async () => {
      const id = getTestId('word1-translation1');
      const result = await getTranslation(id);
      expect(result).toEqual({
        id,
        wordId: getTestId('word1'),
        flectionId: getTestId('verb-flection1'),
        text_de: 'gehen',
        text_sv: 'gå',
      });
    });

    it(`- when used with an invalid word-ID - ${REJECTS} as expected`, async () => {
      const id = getTestId('invalid');
      await expect(() => getTranslation(id)).rejects.toThrow('invalid ID');
    });
  });

  describe('has an async function listAllTranslationsOfWord() which', () => {
    const { listAllTranslationsOfWord } = Translations;

    it(IS_ACCESSIBLE, () => expect(listAllTranslationsOfWord).toBeFunction());

    it(`${EXPECTS} one argument (wordId)`, () => expect(listAllTranslationsOfWord).toHaveLength(1));

    it(`- when used with a valid word-ID - ${RESOLVES} with list of translations`, async () => {
      const wordId = getTestId('word1');
      const results = await listAllTranslationsOfWord(wordId);
      expect(results.map(item => [item.text_de, item.text_sv])).toEqual([
        ['gehen', 'gå'],
        ['er geht', 'han går'],
        ['sie geht', 'hon går'],
        ['wir gehen', 'vi går'],
        ['er ging', 'han gick'],
        ['er ist gegangen', 'han har gått'],
        ['geh!', 'gå!'],
      ]);
    });

    it(`- when used with an invalid word-ID - ${RESOLVES} with empty array`, async () => {
      const wordId = getTestId('invalid');
      const result = await listAllTranslationsOfWord(wordId);
      expect(result).toEqual([]);
    });
  });
});
