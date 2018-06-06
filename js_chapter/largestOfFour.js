function largestOfFour(arr) {
  // 找出多个数组中的最大数
  arr = arr.map(function(val){
    var max = 0;
    for(var i = 0; i < val.length; i ++){
      if(max < val[i]){
        max = val[i];
      }
    }
    return max;
  });
  return arr;
}
