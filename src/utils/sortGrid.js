import { red } from '@material-ui/core/colors';

const sortGrid = (arrayIn, direction, sum) => {
  const arrayToSort = [...arrayIn];
  const sortArray = [];
  const allocatedIndexes = [];

  const checkElement = (...indexes) => {
    let sumOfAll = 0;
    // sum all rows, but if already allocated then exit checkElement
    for (let reducerIndex = 0; reducerIndex < indexes.length; reducerIndex++) {
      if (allocatedIndexes.includes(indexes[reducerIndex])) {
        return;
      }
      sumOfAll += arrayToSort[indexes[reducerIndex]][direction];
    }
    if (sumOfAll === sum) {
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
    if (newDepth <= sum) {
      for (let i = 0; i < arrayToSort.length; i++) {
        if (!(allocatedIndexes.includes(i) || indexes.includes(i))) {
          if (newDepth < sum) {
            deepestSort(newDepth, ...indexes, i);
          }
          checkElement(...indexes, i);
        }
      }
    }
  };

  deepestSort(0);

  // Adds any non matches at this point before return
  for (let checkIndex = 0; checkIndex < arrayToSort.length; checkIndex++) {
    if (!allocatedIndexes.includes(checkIndex)) {
      sortArray.push(arrayToSort[checkIndex]);
    }
  }

  return sortArray;
};

export default sortGrid;
