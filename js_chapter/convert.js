function convert(num) {
  var arr = [];
  var value = 0;
  var t = 0;
  while(num > 0){
    value = num % 10;
    if(value !== 0)
      arr.push([value,t]);
    t ++;
    num = Math.floor(num / 10);
  }
  var arrStr = "";
  for(var i = arr.length-1; i >= 0; i --){
    arrStr += numToRoman(arr[i]);
  }
 return arrStr;
}
function numToRoman(val) {
  var roman = [['I','II','III','IV','V','VI','VII','VIII','IX'],
              ['X','XX','XXX','XL','L','LX','LXX','LXXX','XC'],
              ['C','CC','CCC','CD','D','DC','DCC','DCCC','CM'],
              ['M','MM','MMM']];
  var str = "";
  str = roman[val[1]][val[0]-1];
  return str;
}
