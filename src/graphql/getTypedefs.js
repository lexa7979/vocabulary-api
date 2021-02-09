const { gql } = require('apollo-server');

module.exports = getTypedefs;

function getTypedefs() {
  const typeDefs = gql`
    scalar UUID

    type Query {
      wordClasses(first: Int = 0, offset: Int = 0): [WordClass!]!
      word(id: UUID): Word
      words(first: Int = 0, offset: Int = 0): [Word!]!
      users(first: Int = 0, offset: Int = 0): [User!]!
    }

    type WordClass {
      id: UUID!
      name_de: String
      flections(first: Int = 0, offset: Int = 0): [Flection!]!
    }

    type Flection {
      id: UUID!
      wordClass: WordClass!
      name_de: String
      pos: Int
    }

    type Word {
      id: UUID!
      wordClass: WordClass
      translations(first: Int = 0, offset: Int = 0): [Translation!]!
    }

    type Translation {
      id: UUID!
      flection: Flection
      text_de: String!
      text_sv: String!
      word: Word!
    }

    type User {
      id: UUID!
      login: String!
      name: String
      activeWords(first: Int = 0, offset: Int = 0): [Word!]!
    }
  `;

  return typeDefs;
}
