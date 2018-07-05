function permAlone(str) {
  if(str === "")
    return 0;
  if(str.length == 1)
    return 1;
  var arr_char = str.split("");
  var rt_arr = [];
  //首先生成全排列
  rt_arr.push([arr_char[0]]);
  var begin = 0;
  var end = 1;
  for(var i = 1; i < arr_char.length; i ++){
    var end_temp = 0;
    for(var j = begin; j < end; j ++){
      for(var k = 0; k <= rt_arr[j].length; k ++){
        //简单的temp = rt_arr[j]不行，数组属于引用类型，简单的赋值只是添加了一个指向数组的指针
        var temp = rt_arr[j].concat();
        temp.splice(k,0,arr_char[i]);
        rt_arr.push(temp);
        end_temp ++;
      }
    }
    begin = end;
    end = end + end_temp;
  }
  rt_arr = rt_arr.slice(begin,end);
  //去除有连续重复字符的元素
  var reg = /([a-zA-Z])\1/;
  rt_arr = rt_arr.filter(function(val){
    return reg.test(val.join("")) !== true;
  });
  return rt_arr.length;
}
