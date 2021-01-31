module.exports = {
  getWordClasses,
};

function getWordClasses() {
  const wordClasses = [
    {
      id: '4c67458e-e100-41cf-b603-d6d5ba43907c',
      name_de: 'Verb',
      flections: [
        {
          // id: '67ac0dbe-a1be-45e0-840d-7691f06750b0',
          key: '0',
          name_de: 'Infinitiv',
        },
        {
          // id: 'd38db3b4-9796-4f05-b449-6a06be53c93f',
          key: '1',
          name_de: 'Präsens',
        },
        {
          // id: 'ee037bb5-b83a-4a4f-b56d-987b808c0871',
          key: '2',
          name_de: 'Präteritum',
        },
        {
          // id: '9c0a67f1-b421-4968-96bc-847688866916',
          key: '3',
          name_de: 'Partizip',
        },
        {
          // id: '0fb854ed-3d30-41d7-b6a6-203698f46cfb',
          key: '4',
          name_de: 'Imperativ',
        },
      ],
    },
    {
      id: '2f0aa94f-d30b-4c8b-b035-4438ae2cb15d',
      name_de: 'Substantiv',
      flections: [
        {
          // id: '7e5ac253-2ac9-433a-ab0e-3dcfa1cfe526',
          key: '0',
          name_de: 'Singular, unbestimmt',
        },
        {
          // id: '7976a9b1-cbad-4662-bc3c-42c295d93b16',
          key: '1',
          name_de: 'Singular, bestimmt',
        },
        {
          // id: '6ef0cf7b-1946-4134-a515-b3411b1b8dc8',
          key: '2',
          name_de: 'Plural, unbestimmt',
        },
        {
          // id: 'd301e516-f033-4035-be85-b1f177a54ab1',
          key: '3',
          name_de: 'Plural, bestimmt',
        },
      ],
    },
    {
      id: '32bd29b5-989d-493b-abae-a9a2afaf0c62',
      name_de: 'Adjektiv',
      flections: [
        {
          // id: '76b32f81-8aac-4b61-8dd2-09b9f1e32c6b',
          key: '0',
          name_de: 'Grundstufe, utrum',
        },
        {
          // id: 'bdab06a8-6cb8-4d48-b27b-904862f1f16f',
          key: '1',
          name_de: 'Grundstufe, neutrum',
        },
        {
          // id: '79399369-3c5f-46f7-bd28-ceff66c2f45c',
          key: '2',
          name_de: 'Grundstufe, Plural',
        },
        {
          // id: 'e70e4487-39d2-459e-9042-d7a043bb5fc3',
          key: '3',
          name_de: 'Komparativ',
        },
        {
          // id: 'a6f4ce14-0f2e-4b55-8d21-02e84d514fc9',
          key: '4',
          name_de: 'Superlativ',
        },
      ],
    },
  ];
  return wordClasses;
}
