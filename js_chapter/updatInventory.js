function updateInventory(arr1, arr2) {
    // 请保证你的代码考虑到所有情况
  var curobj = arr1.reduce(function(pre,cur){
    pre[cur[1]] = cur[0];
    return pre;
  },{});
  var arrkey = Object.keys(curobj);
  arr2.forEach(function(item){
    if(arrkey.indexOf(item[1]) == -1)
      curobj[item[1]] = item[0];
    else
      curobj[item[1]] += item[0];
  });
  arrkey = Object.keys(curobj);
  arrkey.sort();
  var arr = [];
  arrkey.forEach(function(item){
    arr.push([curobj[item],item]);
  });
  return arr;
}
