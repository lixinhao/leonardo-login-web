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
  redirect_uri: 'http://localhost/leonardo',
  // baseURL: 'http://api.paascloud.net/'
  baseURL: 'uac'
};
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  base.domain = '.leonardo.net';
  base.baseURL = 'uac';
  base.lockr_prefix += '_DEV_';
} else if (process.env.NODE_ENV === 'debug') {
  base.domain = '.leonardo.net';
  base.baseURL = 'uac';
  base.lockr_prefix += '_DEV_';
} else if (process.env.NODE_ENV === 'production') {
  base.domain = '.leonardo.net';
  base.baseURL = 'https://easy-mock.com/mock/5bff6327c3b9c90b269c18c4/leonardo/';
}
const cbs = {};
// 常量
const enums = {
  // 全局
  GLOBAL: {
    // 整个界面的布局大小
    SIZE: 'SIZE',
    // 项目运行在桌面还是手机
    DEVICE: {
      DESKTOP: 'DESKTOP',
      MOBILE: 'MOBILE'
    }
  },
  // 用户信息常量
  USER: {
    LOGIN_NAME: 'LOGIN_NAME',
    MENU_LIST: 'MENU_LIST',
    REMEMBER_ME: 'REMEMBER_ME',
    AUTH_TOKEN: 'AUTH_TOKEN',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
    REDIRECT_URI: 'REDIRECT_URI'
  },
  // 侧边栏
  SIDEBAR: {
    STATUS: 'sidebarStatus'
  },
  // 权限
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
