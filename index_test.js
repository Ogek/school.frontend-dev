const { sortArr } = require("./index.js");

/**
 * Check if array are equals (helper fot test)
 * @param {array} arr1
 * @param {array} arr2
 */
const arrEquals = (arr1, arr2) => {
  if (arr1.lenght !== arr2.lenght) return false;
  let i;
  for (i in arr1) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

// Tests
(() => {
  const tt = [
    [[3, 2, 1], [1, 2, 3]],
    [[10, 30, 20], [10, 20, 30]],
    [[1, 4, 6], [4, 6, 1]]
  ];
  let arr,
    sortedArr,
    c = 0;
  for ([arr, sortedArr] of tt) {
    c++;
    arr = sortArr(arr);
    if (arrEquals(arr, sortedArr)) continue;
    throw `Arrays ${arr} and ${sortedArr} are not equal!`;
  }
  console.log("OK");
  console.log(`${c} test processed`);
})();
