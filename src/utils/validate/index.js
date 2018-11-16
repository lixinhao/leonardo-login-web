/**
 * 合法uri
 * @param url URL
 * @returns {boolean}
 */
export function validateURL (url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * 小写字母
 * @param str 字符串
 * @returns {boolean}
 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * 大写字母
 * @param str 字符串
 * @returns {boolean}
 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * 大小写字母
 * @param str
 * @returns {boolean}
 */
export function validateAlphabets (str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * 验证邮箱
 * @param email
 * @returns {boolean}
 */
export function validateEmail (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
