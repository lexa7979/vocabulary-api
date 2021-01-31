const { gql } = require('apollo-server');

module.exports = getTypedefs;

function getTypedefs() {
  const typeDefs = gql`
    scalar UUID

    type Query {
      wordClasses(first: Int = 0, offset: Int = 0): [WordClass!]!
      words(first: Int = 0, offset: Int = 0): [Word!]!
      word(id: UUID): Word
    }

    type WordClass {
      id: UUID!
      name_de: String
      flections(first: Int = 0, offset: Int = 0): [Flection!]!
    }

    type Flection {
      wordClass: WordClass!
      flectionKey: String!
      name_de: String
    }

    type Word {
      id: UUID!
      class: WordClass
      translations(first: Int = 0, offset: Int = 0): [Translation!]!
    }

    type Translation {
      word: Word!
      flection: Flection!
      text_de: String!
      text_sv: String!
    }
  `;

  return typeDefs;
}
