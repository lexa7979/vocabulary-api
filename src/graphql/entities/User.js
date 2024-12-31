module.exports = {
    typeDefs: getTypeDefs(),
    resolvers: getResolvers(),
};

function getTypeDefs() {
    return `#graphql
        type Query {
            user(id: UUID): User
            users(first: Int = 0, offset: Int = 0): [User!]!
        }

        type User {
            id: UUID!
            login: String!
            name: String

            activeWords(first: Int = 0, offset: Int = 0): [Word!]!
        }
    `;
}

function getResolvers() {
    return {
        Query: {
            user,
            users,
        },

        User: {
            activeWords: activeWordsOfUser,
        },
    };
}

/**
 * @param {null} parent
 * @param {import("../types").IArgsWithUUID} args
 * @param {import("../types").IGraphQLContext} context
 */
async function user(parent, { id }, { db }) {
    const { login, name, currStep } = await db.getUser(id);
    return {
        id,
        login,
        name,
        currStep,
    };
}

/**
 * @param {null} parent
 * @param {import("../types").IArgsWithFirstAndOffset} args
 * @param {import("../types").IGraphQLContext} context
 */
async function users(parent, { first, offset }, { db }) {
    const list = await db.listAllUsers(first, offset);
    const results = list.map(({ id, login, name }) => ({
        id,
        login,
        name,
    }));
    return results;
}

/**
 * @param {import("../types").IArgsWithUUID} parent
 * @param {import("../types").IArgsWithFirstAndOffset} args
 * @param {import("../types").IGraphQLContext} context
 *
 * @throws
 * @returns {Promise<object[]>}
 */
async function activeWordsOfUser({ id: userId }, { first, offset }, { db }) {
    const list = await db.listAllActiveWordsOfUser(userId, first, offset);
    const results = await Promise.all(
        list.map(async ({ wordId: id }) => {
            await db.getWord(id);
            return {
                id,
            };
        })
    );
    return results;
}
