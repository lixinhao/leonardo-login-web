import store from '@/store/index';
import $http from '@/utils/http';

/**
 * 用户相关的API
 */
class UserHttp {
  /**
   * 登录
   * @param params
   */
  login (params) {
    return $http({
      method: 'POST',
      url: '/uac/auth/form',
      auth: {
        username: 'leonardo-client-uac',
        password: 'leonardoClientSecret'
      },
      params: params
    });
  }

  /**
   * 注册
   */
  register (registerForm) {
    return $http({
      method: 'POST',
      headers: {
        'deviceId': new Date().getTime()
      },
      url: '/uac/auth/register',
      params: registerForm
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
   * 获取图片验证码
   */
  getImage () {
    return $http({
      method: 'POST',
      url: '/uac/auth/code/image',
      headers: {
        'deviceId': new Date().getTime()
      },
      data: ''
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
}

export default new UserHttp();
