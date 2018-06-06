//句中首字母大写
function titleCase(str) {
  // 请把你的代码写在这里
  var array = str.split(' ');
  str = array.map(function(val){
    return val.toLowerCase().replace(/^\S/g, function(s){return s.toUpperCase();});
  }).join(' ');
  return str;
}
