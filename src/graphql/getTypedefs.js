const { gql } = require('apollo-server');

module.exports = getTypedefs;

function getTypedefs() {
  const typeDefs = gql`
    scalar UUID

    type Query {
      wordClasses: [WordClass!]!
    }

    type WordClass {
      id: UUID!
      name_de: String
      flections: [Flection!]!
    }

    type Flection {
      # id: UUID!
      key: String
      name_de: String
    }

    # type Word {
    #   id: UUID!
    #   class: WordClass
    # }
  `;

  return typeDefs;
}
