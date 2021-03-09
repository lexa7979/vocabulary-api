module.exports = updateProgressInActiveWord;

/**
 * @param {object} activeWord
 * @param {{flectionId: string, correctness: number}} newResult
 */
function updateProgressInActiveWord(activeWord, newResult) {
  const { learnProgress: _oldProgress } = activeWord;
  const { flectionId, correctness } = newResult;

  const flectionIdWasUsedBefore =
    _oldProgress.filter(item => item.flectionId === flectionId).length > 0;
  if (flectionIdWasUsedBefore) {
    const result = {
      ...activeWord,
      learnProgress: _oldProgress.map(item => {
        if (item.flectionId === flectionId) {
          return {
            flectionId,
            currGroup: _getUpdatedGroup(item.currGroup, correctness),
            changedAt: new Date().getTime(),
          };
        }
        return item;
      }),
    };
    return result;
  }

  const result = {
    ...activeWord,
    learnProgress: [
      ..._oldProgress,
      {
        flectionId,
        currGroup: _getUpdatedGroup(0, correctness),
        changedAt: new Date().getTime(),
      },
    ],
  };
  return result;
}

function _getUpdatedGroup(oldGroup, correctness) {
  if (![0, 1, 2, 3, 4, 5].includes(oldGroup)) {
    throw new Error(`updateProgressInActiveWord() failed - invalid group`);
  }
  if (correctness === 0) {
    return 0;
  }
  if (correctness === 50) {
    return Math.min(5, oldGroup);
  }
  if (correctness === 100) {
    return Math.min(5, oldGroup + 1);
  }
  throw new Error(`updateProgressInActiveWord() failed - invalid correctness (${correctness})`);
}
