const { sortArr, mergeArr } = require("./index.js");

/**
 * Check if array are equals (helper fot test)
 * @param {array} arr1
 * @param {array} arr2
 */
const arrEquals = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  let i;
  for (i in arr1) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

(() => {
  console.log("Tests for sort");
  const tt = [[[3, 2, 1], [1, 2, 3]], [[10, 30, 20], [10, 20, 30]]];
  let arr,
    r,
    c = 0;
  for ([arr, r] of tt) {
    c++;
    arr = sortArr(arr);
    if (arrEquals(arr, r)) continue;
    throw `Arrays ${arr} and ${r} are not equal!`;
  }
  console.log("OK");
  console.log(`${c} test processed`);
})();

(() => {
  console.log("Test for merge");
  const tt = [[[1, 2, 3], [3], [1, 2, 3]]];
  let arr,
    r,
    c = 0,
    tr;
  for ([arr, arr2, r] of tt) {
    c++;
    tr = mergeArr(arr, arr2);
    if (arrEquals(tr, r)) continue;
    throw `Arrays ${tr} and ${r} are not equal!`;
  }
  console.log("OK");
  console.log(`${c} test processed`);
})();
