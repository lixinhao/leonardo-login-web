const base = {
  // host
  host: 'https://wwww.baidu.com',
  // 本地存储localStorage 的前缀
  lockr_prefix: 'leonardo',
  secret_key: '^#rwd6Ffz$X5alRN',
  domain: '.leonardo.net',
  secret: {
    key_str: '^#rwd6Ffz$X5alRN',
    iv_str: '^#rwd6Ffz$X5alRN'
  }
};
const cbs = {};
// 生成模式
if (process.env.NODE_ENV === 'production') {
  base.domain = '.leonardo.net';
} else {
  base.domain = '.leonardo.net';
  base.lockr_prefix += '_DEV_';
}
const enums = {
  USER: {
    LOGIN_NAME: 'LOGIN_NAME',
    MENU_LIST: 'MENU_LIST',
    REMEMBER_ME: 'REMEMBER_ME',
    AUTH_TOKEN: 'AUTH_TOKEN',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
    REDIRECT_URI: 'REDIRECT_URI'
  }
};
export {
  base,
  cbs,
  enums
};
