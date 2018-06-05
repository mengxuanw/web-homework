function palindrome(str) {
  // 请把你的代码写在这里
  str = str.toLowerCase().replace(/[\W\s_]/gi,'');
  return str == str.split("").reverse().join("");
}
