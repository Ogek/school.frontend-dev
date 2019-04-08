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

/**
 * Merge arrays
 * @param {array} arr1
 * @param {array} arr2
 * @returns {array}
 */
const mergeArr = (arr1, arr2) => {
  return [...new Set([...arr1, ...arr2])];
};

exports.sortArr = sortArr;
exports.mergeArr = mergeArr;
