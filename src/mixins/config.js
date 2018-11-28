let config = {
  data () {
    return {};
  },
  methods: {
    // 加载页面
    $_config_loadPage (routerName, param) {
      // 想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL
      if (param) {
        // router.push({ path: 'register', query: { plan: 'private' }}) // -> /register?plan=private
        // router.push({ name: 'user', params: { userId }}) // -> /user/123
        // router.push({ path: `/user/${userId}` }) // -> /user/123
        // router.push({ path: '/user', params: { userId }}) // -> /user
        this.$router.push({ name: routerName, query: param });
      } else {
        this.$router.push({ name: routerName });
      }
    },
    // 返回按钮
    $_config_goBack () {
      // router.go(1)  在浏览器记录中前进一步，等同于 history.forward()
      //  router.go(-1) 后退一步记录，等同于 history.back()
      // router.go(3)前进 3 步记录
      //  router.go(-100)     router.go(100) 如果 history 记录不够用，那就默默地失败呗
      this.$router.go(-1);
    },
    // 返回主页
    $_config_goHome () {
      this.$_config_loadPage('Index');
    },
    // 获取URL参数
    $_config_getUrlParam (name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      let result = window.location.search.substr(1).match(reg);
      return result ? decodeURIComponent(result[2]) : null;
    },
    // Link判断
    $_config_isExternal (path) {
      return /^(https?:|mailto:|tel:)/.test(path);
    }
  }
};
export default config;
