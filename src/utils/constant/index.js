const base = {
  // host
  host: 'https://wwww.baidu.com',
  // 本地存储localStorage 的前缀
  lockr_prefix: 'leonardo',
  secret_key: '^#rwd6Ffz$X5alRN',
  domain: '.leonardo.net',
  auth: {
    username: 'leonardo-client-uac',
    password: 'leonardoClientSecret'
  },
  timeout: 60000,
  redirect_uri: 'http://mall.paascloud.net',
  baseURL: 'http://api.paascloud.net/'
};
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  base.domain = '.leonardo.net';
  base.baseURL = 'http://api.paascloud.net/';
  base.lockr_prefix += '_DEV_';
} else if (process.env.NODE_ENV === 'debug') {
  base.domain = '.leonardo.net';
  base.baseURL = 'http://api.paascloud.net/';
  base.lockr_prefix += '_DEV_';
} else if (process.env.NODE_ENV === 'production') {
  base.domain = '.leonardo.net';
  base.baseURL = 'http://api.paascloud.net/';
}
const cbs = {};
// 常量
const enums = {
  USER: {
    LOGIN_NAME: 'LOGIN_NAME',
    MENU_LIST: 'MENU_LIST',
    REMEMBER_ME: 'REMEMBER_ME',
    AUTH_TOKEN: 'AUTH_TOKEN',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
    REDIRECT_URI: 'REDIRECT_URI'
  },
  SIDEBAR: {
    STATUS: 'sidebarStatus'
  },
  PERMISSION: {
    // 白名单: 在免登录白名单，直接进入
    WHITELIST: ['/login', '/auth-redirect']
  }
};
export {
  base,
  cbs,
  enums
};
