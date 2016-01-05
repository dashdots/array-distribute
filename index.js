'use strict';

export default function arrayDistribute(array, restValue, getItemValue) {
  let total = restValue + array.reduce((o,x) => o + getItemValue(x), 0);
  let average, rest = 0, prevCount = 0;

  const result = [];
  array.sort((a,b) => getItemValue(b) - getItemValue(a)).forEach((x,i) => {
    result[i]=0;
    const curCount = getItemValue(x);

    if (average===undefined) {
      const curAverage = Math.floor((total - prevCount) / (array.length - i));
      if (curCount < curAverage) {
        average = curAverage;
        rest = (total - prevCount) % (array.length-i);
      } else {
        prevCount += curCount;
      }
    }

    if (average!==undefined) {
      let dist = average - curCount;
      if (rest > 0) {
        rest --;
        dist ++;
      }
      result[i] = dist;
    }
  });

  return result;
};