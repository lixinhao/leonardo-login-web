import store from '@/store/index';
import { base, http as $http } from '@/utils';

let deviceId;

/**
 * 用户相关的API
 */
class UserHttp {
  /**
   * 获取图片验证码
   */
  getImageCode () {
    deviceId = new Date().getTime();
    return new Promise((resolve, reject) => {
      $http({
        method: 'POST',
        url: '/uac/auth/code/image',
        headers: {
          'deviceId': deviceId
        },
        data: ''
      }).then((res) => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }

  /**
   * 登录
   */
  login (userInfo) {
    return new Promise((resolve, reject) => {
      $http({
        method: 'POST',
        url: '/uac/auth/form',
        auth: {
          username: base.auth.username,
          password: base.auth.password
        },
        headers: {
          'deviceId': deviceId
        },
        params: userInfo
      }).then((res) => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }

  /**
   * 注册
   */
  register (registerForm) {
    return new Promise((resolve, reject) => {
      $http({
        method: 'POST',
        headers: {
          'deviceId': new Date().getTime()
        },
        url: '/uac/auth/register',
        params: registerForm
      }).then((res) => {
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    });
  }

  /**
   * 刷新Token
   */
  refreshToken () {
    return $http({
      method: 'GET',
      url: '/uac/auth/user/refreshToken',
      auth: {
        username: 'leonardo-client-uac',
        password: 'leonardoClientSecret'
      },
      params: {
        refreshToken: store.getters.getRefreshToken,
        accessToken: store.getters.getAccessToken
      }
    });
  }

  /**
   * 发送重置密码邮件
   */
  checkEmailActive (params) {
    return $http({
      method: 'POST',
      url: '/uac/auth/checkEmailActive/' + params
    });
  }

  /**
   * 发送验证码
   */
  sendPhoneCode (params) {
    return $http({
      method: 'POST',
      url: `/uac/auth/code/sms`,
      headers: {
        'deviceId': new Date().getTime()
      },
      params: params
    });
  }

  /**
   * 登出
   */
  logout () {
    return this.$http({
      method: 'POST',
      url: '/uac/user/logout',
      params: {
        accessToken: this.$store.getters.getAccessToken
      }
    }).then(() => {
      this.$store.dispatch('delete_user_info');
      this.goHome();
    }).catch(() => {
      this.$store.dispatch('delete_user_info');
      this.goHome();
    });
  }
}

export default new UserHttp();
