const { GraphQLScalarType } = require('graphql');

const { allTypeDefs, allResolvers } = require('./index');

const { bold } = require('../../../test');

describe(`Array ${bold('allTypeDefs')}`, () => {
    it(`has the expected content`, () => {
        expect(allTypeDefs).toEqual({
            Basics: expect.stringContaining('#graphql'),
            User: expect.stringContaining('#graphql'),
            Word: expect.stringContaining('#graphql'),
            WordClass: expect.stringContaining('#graphql'),
        });

        const _extractInfo = value => [...value.matchAll(/(type|scalar) \w+/g)].map(item => item[0]);
        const typesByKey = Object.entries(allTypeDefs).reduce(
            (acc, [key, value]) => ({ ...acc, [key]: _extractInfo(value) }),
            {}
        );
        expect(typesByKey).toEqual({
            Basics: ['scalar UUID'],
            User: ['type Query', 'type User'],
            Word: ['type Query', 'type Word', 'type Translation'],
            WordClass: ['type Query', 'type WordClass', 'type Flection'],
        });
    });
});

describe(`Array ${bold('allResolvers')}`, () => {
    it(`has the expected content`, () => {
        expect(allResolvers).toEqual({
            Basics: {
                UUID: expect.any(GraphQLScalarType),
            },
            User: {
                Query: {
                    user: expect.any(Function),
                    users: expect.any(Function),
                },
                User: {
                    activeWords: expect.any(Function),
                },
            },
            Word: {
                Query: {
                    word: expect.any(Function),
                    words: expect.any(Function),
                },
                Translation: {
                    flection: expect.any(Function),
                    word: expect.any(Function),
                },
                Word: {
                    translations: expect.any(Function),
                    wordClass: expect.any(Function),
                },
            },
            WordClass: {
                Flection: {
                    wordClass: expect.any(Function),
                },
                Query: {
                    wordClass: expect.any(Function),
                    wordClasses: expect.any(Function),
                },
                WordClass: {
                    flections: expect.any(Function),
                },
            },
        });
    });
});
