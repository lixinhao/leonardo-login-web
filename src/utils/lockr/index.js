import { base } from '../constant';
import Lockr from 'lockr';

Lockr.prefix = base.lockr_prefix;

// 本地存储localStorage
class MyLockr {
  constructor () {
    this.pcPrefix = base.lockr_prefix;
    this.secretKey = base.secret_key;
  }

  set (key, value, fn) {
    MyLockr.checkKey(key);
    Lockr.set(key, value);
    fn && fn();
  }

  get (key) {
    MyLockr.checkKey(key);
    return Lockr.get(key);
  }

  delete (key, fn) {
    MyLockr.checkKey(key);
    Lockr.rm(this.pcPrefix + key);
    fn && fn();
  }

  add (key, value, fn) {
    MyLockr.checkKey(key);
    Lockr.sadd(key, value);
    fn && fn();
  }

  getList (key) {
    MyLockr.checkKey(key);
    return Lockr.smembers(key);
  }

  contains (key, value, fn) {
    MyLockr.checkKey(key);
    // sismember判断指定键是否存在那个值
    return Lockr.sismember(key, value);
  }

  remove (key, value, fn) {
    MyLockr.checkKey(key);
    Lockr.srem(key, value);
    fn && fn();
  }

  removeAll (key, fn) {
    MyLockr.checkKey(key);
    let smembers = Lockr.smembers(key);
    for (let index in smembers) {
      Lockr.srem(key, smembers[index]);
    }
    fn && fn();
  }

  clear (fn) {
    Lockr.flush();
    fn && fn();
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

export default new MyLockr();
