import axios from 'axios';
import store from '../../store/';
// 刷新Token的URL
const REFRESH_TOKEN_URL = '/uac/auth/user/refreshToken';

// 刷新Token
export function refreshToken () {
  return axios({
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: REFRESH_TOKEN_URL,
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
