import Vue from 'vue';
import Router from 'vue-router';
import { Auth } from '@/views';
import layout from '@/views/layout';

Vue.use(Router);
export default new Router({
  // 去掉路由地址的#
  mode: 'history',
  // 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置
  routes: [
    {
      // 默认进入路由[写在第一个]
      path: '/',
      // 在顶级路由就配置命名视图
      // 重定向到Login
      redirect: { name: 'Login' },
      // 在顶级路由就配置命名视图 APP.vue
      component: Auth.Layout,
      children: [{
        meta: {
          name: '用户登录',
          noRequiredAuth: true
        },
        // 当 /login 匹配成功，Auth.Login 会被渲染
        path: 'login',
        name: 'Login',
        component: Auth.Login
      }, {
        meta: {
          name: '用户注册',
          noRequiredAuth: true
        },
        path: 'register',
        name: 'Register',
        component: Auth.Register
      }
      ]
    },
    {
      path: '/leonardo',
      component: layout,
      redirect: { name: 'Dashboard' },
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index'),
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
        }
      ]
    },
    {
      // 错误路由[写在最后一个]
      path: '*',
      component: Error.NotFoundPage
    }
  ]
});
