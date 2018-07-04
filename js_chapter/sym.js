function sym(args) {
  function func(arr1,arr2){
    var a = arr1.filter(function(val){
      return arr2.indexOf(val) == -1;
    });
    var b = arr2.filter(function(val){
      return arr1.indexOf(val) == -1;
    });
    return a.concat(b);
  }
  var arr = arguments[0];
  for(var i = 1; i < arguments.length; i ++){
    arr = func(arr,arguments[i]);
  }
  //数组去重
  arr = arr.filter(function(item,index,array){
    return array.indexOf(item) == index;
  });
  return arr;
}
