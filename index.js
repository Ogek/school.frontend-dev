/**
 * Sort array of integers
 * @param {array} arr - The array to sort
 * @returns {array} - Sorted array
 */
const sortArr = arr => {
  let tmp, i;
  for (i in arr) {
    for (j in arr) {
      if (arr[i] < arr[j]) {
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }
  }
  return arr;
};

exports.sortArr = sortArr;
