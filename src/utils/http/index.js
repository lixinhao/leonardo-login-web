import axios from 'axios';
import { base } from '@/utils/constant';
import store from '@/store';
import { Message as $message } from 'element-ui';

let $http = axios.create({
  // 环境的切换
  baseURL: base.baseURL,
  timeout: base.timeout
});
// 配置请求头
$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// $http.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
// 添加一个请求拦截器
$http.interceptors.request.use(config => {
// 在发送请求之前做些什么
  store.dispatch('get_access_token', (res) => {
    if (res) {
      config.headers.Authorization = 'Bearer ' + res;
    }
  });
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
$http.interceptors.response.use((res) => {
  if (res.data.code === 200) {
    if (res.data) {
      return res.data;
    }
  }
  if (res.data.code === 10011039 || res.data.code === 10011040 || res.data.code === 10011041) {
    console.info('登录超时', res.data);
    // 验证token失败 || 解析header失败 || 页面已过期,请重新登录
    // store.dispatch('delete_user_info');
    // window.location.href = '/';
    return Promise.reject(res);
  } else {
    $message({
      showClose: false,
      message: res.data.message,
      type: 'success'
    });
    return Promise.reject(res);
  }
}, (error) => {
  // 对响应错误做点什么
  let options = {
    autoClose: true,
    content: error.response.data.message
  };
  if (error.response) {
    console.error('error: ', error.response);
    if (error.response.status === 500) {
      options.content = error.response.data.message;
    } else if (error.response.status === 401) {
      store.dispatch('delete_user_info');
      options.content = '登录超时, 请重新登录';
      window.location.href = '/';
    } else {
      console.error('Error', error.message);
      options.content = '接口请求失败或超时！请刷新重试';
    }
  } else {
    options.content = '接口请求失败或超时！请刷新重试';
  }
  $message({
    showClose: false,
    message: options.content,
    type: 'error'
  });
});
export default $http;
