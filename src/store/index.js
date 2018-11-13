import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import user from './user/';
import global from './global/';
import layout from './layout/';
// vuex状态管理目录
Vue.use(Vuex);
Vue.prototype.$http = axios.create({
  timeout: 60000
});
export default new Vuex.Store({
  modules: {
    user,
    global,
    layout
  }
});
