function where(collection, source) {
  var arr = [];
  // What's in a name?
  arr = Object.keys(source);
  var arr1 = [];
  var flag = true;
  for(var i = 0; i < collection.length; i ++){
    flag = true;
    for(var j = 0; j < arr.length; j ++){
      if(!collection[i].hasOwnProperty(arr[j])){
        flag = false;
        break;
      }
      else if(collection[i][arr[j]] != source[arr[j]]){
        flag = false;
        break;
      }
    }
    if(flag){
      arr1.push(collection[i]);
    }
  }
  return arr1;
}
