import Vue from 'vue';
import Vuex from 'vuex';
import user from './user/';
import global from './global/';
import lang from './lang/';
import sidebar from './sidebar';
import tagsView from './tagsView';
// vuex状态管理目录
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    user,
    global,
    lang,
    tagsView,
    sidebar
  }
});
