function pairwise(arr, arg) {
  var index_arr = [];
  var rt = arr.reduce(function(acc, cur, curindex){
    if(cur !== undefined){
      var num = arg - cur;
      var index = arr.indexOf(num);
      if(index !== -1 && index !== curindex){
        acc += index + curindex;
        delete arr[curindex];
        delete arr[index];
        //js中delete不会让数组长度改变，keypoint
      }
    }
    return acc;
  },0);
  return rt;
}
