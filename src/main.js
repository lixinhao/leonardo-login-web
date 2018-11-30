import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import store from './store/';
import './icons';
import NProgress from 'nprogress';
import Cookies from 'js-cookie';
import 'nprogress/nprogress.css';
import VueLazyload from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import i18n from './locale';
import { Async, Config, Msg, Validate } from './mixins';
import { enums, http, MyCookie, MyEncrypt, MyLockr } from './utils';
import './mock';
// 状态管理
Vue.use(Vuex);
// 滚动条
Vue.use(infiniteScroll);
// 图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/loading-svg/loading-bars.svg',
  loading: '/static/loading-svg/loading-spinning-bubbles.svg',
  attempt: 2
});
// 全站进度条
Vue.prototype.$myNProgress = NProgress;
// 全局配置对象。该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）
// 项目中所有拥有 size 属性的组件的默认尺寸均为 'small'
Vue.use(Element, {
  size: Cookies.get(enums.GLOBAL.SIZE) || 'medium',
  i18n: (key, value) => i18n.t(key, value)
});
// 封装复用的代码
Vue.mixin(Config);
Vue.mixin(Async);
Vue.mixin(Msg);
Vue.mixin(Validate);
//定义全局变量
Vue.prototype.$myEnum = enums;
Vue.prototype.$myEncrypt = MyEncrypt;
Vue.prototype.$myLockr = MyLockr;
Vue.prototype.$myCookie = MyCookie;
Vue.prototype.$http = http;
// 注册一个全局前置守卫 当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
// to  即将要进入的目标 路由对象
// from 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
// next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
// next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
// next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
// next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调
router.beforeEach((to, from, next) => {
  store.dispatch('get_access_token', (res) => {
    if (res) {
      window.location.href = store.getters.getRedirectUri;
    } else {
      NProgress.start();
      next();
    }
  });
});
// 全局后置钩子
router.afterEach(transition => {
  NProgress.done();
});
// 关闭生产模式下给出的提示
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  // 渲染App组件
  render: h => h(App)
  // 延迟挂载
}).$mount('#app');
