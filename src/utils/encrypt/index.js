import CryptoJS from 'crypto-js';
import { base } from '../constant';

// 加密算法工具
class MyCryptoJs {
  // 获取值
  constructor () {
    this.secretKey = base.secret_key;
  }

  // AES加密
  encrypt (data, key) {
    if (!key) {
      key = this.secretKey;
    }
    let encryptResult = CryptoJS.AES.encrypt(data, key);
    return encryptResult.toString();
  }

  // AES解密
  decrypt (data, key) {
    let bytes = '';
    if (!key) {
      key = this.secretKey;
    }
    try {
      bytes = CryptoJS.AES.decrypt(data.toString(), key || this.secretKey);
    } catch (ex) {
      console.info('CryptoJs.decrypt异常=', ex);
    }
    return bytes.toString(CryptoJS.enc.Utf8).toString();
  }

  // Base64加密
  aesEncrypt (data, keyStr, ivStr) {
    let sendData = CryptoJS.enc.Utf8.parse(data);
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);
    let encrypted = CryptoJS.AES.encrypt(sendData, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      // 后台用的是pad.Iso10126,前台对应为Iso10126
      padding: CryptoJS.pad.Iso10126
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  }

  // AES解密
  aesDecrypt (data, keyStr, ivStr) {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);
    // 解密的是基于BASE64的数据，此处data是BASE64数据
    let decrypted = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Iso10126
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}

export default new MyCryptoJs();
