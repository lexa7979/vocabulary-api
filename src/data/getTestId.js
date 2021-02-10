const { v4: uuid } = require('uuid');

const Global = {
  idBuffer: {
    verb: '4c67458e-e100-41cf-b603-d6d5ba43907c',
    noun: '2f0aa94f-d30b-4c8b-b035-4438ae2cb15d',
    adjective: '32bd29b5-989d-493b-abae-a9a2afaf0c62',

    word1: '557e781b-e66a-4aa1-b9e4-b7fd1a9f5814',
    word2: '6319e7a3-0b02-4c83-afc7-b96004d134eb',
    word3: '1a20fdc0-e1b3-41cf-89af-0ea15136f8c3',

    user1: '53a52f15-c0b7-421e-a7d6-03f8f7aa90c9',
    user2: '3676f392-4896-4636-b47b-b9d696350248',
  },
};

module.exports = getTestId;

function getTestId(key) {
  if (Global.idBuffer[key] == null) {
    Global.idBuffer[key] = uuid();
  }
  return Global.idBuffer[key];
}
