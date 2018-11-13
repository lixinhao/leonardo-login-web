import { base, enums, MyCookie, MyLockr } from '@/utils';
import { refreshToken } from '@/api/refreshToken';
// 状态:用来存放数据
const state = {
  // 登录名
  loginName: '',
  // 记住我
  rememberMe: false,
  // 按钮列表
  menuList: [],
  // 重定向地址
  redirectUri: '',
  // 认证的Token
  authToken: {
    access_token: '',
    expires_in: '',
    timestamp: ''
  },
  // 刷新Token
  refreshToken: {
    refresh_token: ''
  }
};
// 状态的Getter方法 this.$store.getters.xxx来绑定数据
const getters = {
  /**
   * 获取"记住我"的状态
   * @param state
   * @returns {boolean|*}
   */
  getRememberMe: (state) => {
    if (!state.rememberMe) {
      state.rememberMe = !!MyCookie.get(enums.USER.REMEMBER_ME);
    }
    return state.rememberMe;
  },
  /**
   * 获取刷新的Token
   * @param state
   * @returns {string}
   */
  getRefreshToken: (state) => {
    if (!state.refreshToken) {
      state.refreshToken = MyCookie.get(enums.USER.REFRESH_TOKEN) ? JSON.parse(MyCookie.get(enums.USER.REFRESH_TOKEN)) : {};
    }
    return state.refreshToken.refresh_token;
  },
  /**
   * 获取认证的Token
   * @param state
   * @returns {string}
   */
  getAccessToken: (state) => {
    if (!state.authToken) {
      state.authToken = MyCookie.get(enums.USER.AUTH_TOKEN) ? JSON.parse(MyCookie.get(enums.USER.AUTH_TOKEN)) : {};
    }
    return state.authToken.access_token;
  },
  /**
   * 获取认证的Token数组
   * @param state
   * @returns {{}|*}
   */
  getAuthToken: (state) => {
    if (!state.authToken || state.authToken.access_token === '') {
      state.authToken = MyCookie.get(enums.USER.AUTH_TOKEN) ? JSON.parse(MyCookie.get(enums.USER.AUTH_TOKEN)) : {};
    }
    return state.authToken;
  },
  /**
   * 获取重定向地址
   * @param state
   * @returns {string|*}
   */
  getRedirectUri: (state) => {
    if (!state.redirectUri) {
      state.redirectUri = MyCookie.get(enums.USER.REDIRECT_URI) ? MyCookie.get(enums.USER.REDIRECT_URI) : base.redirect_uri;
    }
    return state.redirectUri;
  }
};
// 改变state状态
const mutations = {
  /**
   * 更新"记住我"
   * @param state 状态
   */
  updateRememberMe (state) {
    state.rememberMe = !state.rememberMe;
    console.info('state.rememberMe:', state.rememberMe);
    if (state.rememberMe) {
      MyCookie.set({
        key: enums.USER.REMEMBER_ME,
        value: state.rememberMe
      });
    } else {
      MyCookie.delete({
        key: enums.USER.REMEMBER_ME
      });
    }
  },
  /**
   * 更新用户信息
   * @param state 状态
   * @param loginName 登录名
   */
  updateUserInfo (state, loginName) {
    state.loginName = loginName;
    MyCookie.set({
      key: enums.USER.LOGIN_NAME,
      value: loginName
    });
  },
  /**
   * 更新用户按钮
   * @param state 状态
   * @param menuList 按钮列表
   */
  updateUserMenu (state, menuList) {
    state.menuList = menuList;
    MyLockr.set(enums.USER.MENU_LIST, menuList);
  },
  /**
   * 更新认证Token
   * @param state 状态
   * @param authToken Token
   */
  updateAuthToken (state, authToken) {
    state.authToken = authToken;
    /**
     * 如何使cookie在一天之内过期
     * https://github.com/js-cookie/js-cookie/wiki/Frequently-Asked-Questions#expire-cookies-in-less-than-a-day
     *  expires=2/24   ===> 设置2小时过期
     *  expires=0.5    ===> 设置12小时
     *  expires=0.5    ===> 设置12小时
     *  expires=1/48   ===> 设置30分钟
     */
    let expires = 2 / 24;
    /**
     * !!a ===> a!=null&&typeof(a)!=undefined&&a!=''
     */
    let isRemember = !!MyCookie.get(enums.USER.REMEMBER_ME);
    if (isRemember) {
      expires = 7;
    }
    // debugger;
    delete authToken['jti'];
    delete authToken['token_type'];
    let refreshToken = {};
    // 将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
    Object.assign(refreshToken, authToken);
    // delete authToken['scope'];
    delete authToken['refresh_token'];
    delete refreshToken['access_token'];
    state.refreshToken = refreshToken;
    console.info('updateAuthToken - token:', authToken);
    MyCookie.set({
      key: enums.USER.AUTH_TOKEN,
      value: authToken,
      expires: expires
    });
    MyCookie.set({
      key: enums.USER.REFRESH_TOKEN,
      value: refreshToken,
      expires: expires
    });
  },
  /**
   * 删除用户信息
   * @param state 状态
   */
  deleteUserInfo (state) {
    MyCookie.delete({
      key: enums.USER.LOGIN_NAME
    });
    state.loginName = '';
    MyCookie.delete({
      key: enums.USER.REMEMBER_ME
    });
    state.rememberMe = false;
  },
  /**
   * 删除用户按钮列表信息
   * @param state 状态
   */
  deleteUserMenuToken (state) {
    state.menuList = [];
    MyCookie.delete({
      key: enums.USER.MENU_LIST
    });
  },
  /**
   * 删除认证Token
   * @param state 状态
   */
  deleteAuthToken (state) {
    state.authToken = {};
    MyCookie.delete({
      key: enums.USER.AUTH_TOKEN
    });
  },
  /**
   * 本地删除用户按钮列表信息
   * @param state 状态
   */
  deleteMenuList (state) {
    MyLockr.delete(enums.USER.MENU_LIST);
    state.menuList = {};
  },
  /**
   * 本地删除"记住我"
   * @param state 状态
   */
  deleteRememberMe (state) {
    MyLockr.delete(enums.USER.REMEMBER_ME);
    state.rememberMe = '';
  },
  /**
   * 更新重定向地址URL
   * @param state 状态
   * @param redirectUri URL
   */
  updateRedirectUri (state, redirectUri) {
    state.redirectUri = redirectUri;
    MyCookie.set({
      key: enums.USER.REDIRECT_URI,
      value: redirectUri
    });
  }
};
// dispatch 一个action [commit mutation]
const actions = {
  /**
   * 获取Token
   * @param commit
   * @param cb
   */
  get_access_token ({ commit }, cb) {
    if (!state.authToken || state.authToken.access_token === '') {
      state.authToken = MyCookie.get(enums.USER.AUTH_TOKEN) ? JSON.parse(MyCookie.get(enums.USER.AUTH_TOKEN)) : {};
    }
    console.info('refresh_token:', state.authToken.refresh_token);
    if (state.authToken.access_token) {
      // 判断是否需要续租
      if ((new Date().getTime() - state.authToken.timestamp) > 100 * 60 * 1000) {
        refreshToken().then(res => {
          console.info('res:', res);
          if (res.data.code === 200) {
            commit('updateAuthToken', res.data.result);
          } else {
            commit('deleteUserInfo');
            commit('deleteAuthToken');
            commit('deleteMenuList');
            commit('deleteRememberMe');
            jumpLoginPage();
          }
        });
      }
    }
    // 判断cb是否有被当成参数传过来，有的话则执行cb函数
    cb && cb(state.authToken.access_token);
  },
  /**
   * 更新"记住我"
   * @param commit
   */
  update_remember_me ({ commit }) {
    commit('updateRememberMe');
  },
  /**
   * 更新用户信息
   * @param commit
   * @param loginName
   */
  update_user_info ({ commit }, loginName) {
    commit('updateUserInfo', loginName);
  },
  /**
   * 更新用户的按钮
   * @param commit
   * @param menuList
   */
  update_user_menu ({ commit }, menuList) {
    commit('updateUserMenu', menuList);
  },
  /**
   * 删除用户信息
   * @param commit
   * @param loginName
   */
  delete_user_info ({ commit }, loginName) {
    commit('deleteUserInfo', loginName);
    commit('deleteAuthToken');
    commit('deleteUserMenuToken');
    commit('deleteRememberMe');
  },
  /**
   * 更新认证Token
   * @param commit
   * @param authToken
   */
  update_auth_token ({ commit }, authToken) {
    commit('updateAuthToken', authToken);
  },
  /**
   * 更新重定向地址URL
   * @param commit
   * @param redirectUri
   */
  update_redirect_uri ({ commit }, redirectUri) {
    commit('updateRedirectUri', redirectUri);
  }
};

/**
 * 跳转登录页面
 */
function jumpLoginPage () {
  if (process.env.NODE_ENV === 'production') {
    window.location.href = 'http://login.leonardo.net/login';
  } else {
    window.location.href = 'http://dev-login.leonardo.net/login';
  }
}

export default {
  state,
  getters,
  actions,
  mutations
};
