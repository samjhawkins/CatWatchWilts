const sortGrid = (arrayIn) => {
  const colWidth = parseInt(process.env.COLUMN_WIDTH, 0);
  let arrayToSort = [];
  let arrayToAppend = [];
  arrayIn.forEach((item) => {
    if (item.active) {
      arrayToSort = [...arrayToSort, item];
    } else {
      arrayToAppend = [...arrayToAppend, item];
    }
  });
  const sortArray = [];
  const allocatedIndexes = [];

  const checkElement = (...indexes) => {
    let sumOfAll = 0;
    // sum all rows, but if already allocated then exit checkElement
    for (
      let reducerIndex = 0;
      reducerIndex < indexes.length;
      reducerIndex += 1
    ) {
      if (allocatedIndexes.includes(indexes[reducerIndex])) {
        return;
      }
      sumOfAll +=
        arrayToSort[indexes[reducerIndex]][process.env.TILE_DIRECTION];
    }
    if (sumOfAll === colWidth) {
      // found a match, so process
      indexes.forEach((currentIndex) => {
        sortArray.push(arrayToSort[currentIndex]);
        allocatedIndexes.push(currentIndex);
      });
    }
  };

  // prioritise the largest combo over the least
  const deepestSort = (depth, ...indexes) => {
    const newDepth = depth + 1;
    if (newDepth <= colWidth) {
      for (let i = 0; i < arrayToSort.length; i += 1) {
        if (!(allocatedIndexes.includes(i) || indexes.includes(i))) {
          if (newDepth < colWidth) {
            deepestSort(newDepth, ...indexes, i);
          }
          checkElement(...indexes, i);
        }
      }
    }
  };

  deepestSort(0);

  // Adds any non matches at this point before return
  for (let checkIndex = 0; checkIndex < arrayToSort.length; checkIndex += 1) {
    if (!allocatedIndexes.includes(checkIndex)) {
      sortArray.push(arrayToSort[checkIndex]);
    }
  }

  return [...sortArray, ...arrayToAppend];
};

export default sortGrid;
