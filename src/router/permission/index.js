import router from '@/router';
import store from '@/store';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {enums} from '@/utils';

NProgress.configure({ showSpinner: false });

/**
 * 判断权限
 * @param roles
 * @param permissionRoles
 * @returns {*}
 */
function hasPermission (roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) {
    return true;
  }
  if (!permissionRoles) {
    return true;
  }
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}
// 注册一个全局前置守卫 当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
// to  即将要进入的目标 路由对象
// from 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
// next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
// next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
// next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
// next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (this.$store.getters.getAccessToken) {
    // Token存在
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      // 判断当前用户是否已拉取完menuList信息
      if (store.getters.menuList.length === 0) {
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true } })
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (enums.PERMISSION.WHITELIST.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
