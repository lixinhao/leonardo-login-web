import { base } from '../constant';
import Cookies from 'js-cookie';

// cookie工具
class MyJsCookie {
  constructor () {
    this.pcPrefix = base.lockr_prefix;
    this.secretKey = base.secret_key;
    this.domain = base.domain;
    this.expireTime = 7200;
  }

  // 设置cookie
  set (cookieParam) {
    let { key, value, expires, path, success } = cookieParam;
    MyJsCookie.checkKey(key);
    key = this.pcPrefix + key;
    Cookies.set(key, value, { expires: expires || this.expireTime, path: path || '/', domain: this.domain });
    success && success();
  }

  // 获取cookie
  get (key) {
    MyJsCookie.checkKey(key);
    return Cookies.get(this.pcPrefix + key);
  }

  // 删除cookie
  delete (cookieParam) {
    let { key, path, success } = cookieParam;
    MyJsCookie.checkKey(key);
    Cookies.remove(this.pcPrefix + key, { path: path || '/', domain: this.domain });
    success && success();
  }

  // 获取所有cookie
  getAll () {
    return Cookies.get();
  }

  static checkKey (key) {
    if (!key) {
      throw new Error('没有找到key');
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象');
    }
  }
}

export default new MyJsCookie();
