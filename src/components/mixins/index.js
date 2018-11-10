let mixin = {
  data () {
    return {};
  },
  methods: {
    // 获取URL参数
    getUrlParam (name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      let result = window.location.search.substr(1).match(reg);
      return result ? decodeURIComponent(result[2]) : null;
    },
    // 加载页面
    loadPage (routerName, param) {
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
    // 成功后显示的Tips
    successTips (msg) {
      this.$store.dispatch('new_notice', {
        autoClose: true,
        content: msg || '操作成功！'
      });
    },
    // 失败后显示的Tips
    errorTips (msg) {
      this.$store.dispatch('new_notice', {
        autoClose: true,
        content: msg || '哪里不对了?'
      });
    },
    // 返回按钮
    goBack () {
      // router.go(1)  在浏览器记录中前进一步，等同于 history.forward()
      //  router.go(-1) 后退一步记录，等同于 history.back()
      // router.go(3)前进 3 步记录
      //  router.go(-100)     router.go(100) 如果 history 记录不够用，那就默默地失败呗
      this.$router.go(-1);
    },
    // 返回主页
    goHome () {
      this.loadPage('Index');
    },
    // 成功的消息
    successMsg (msg, showClose) {
      this.message(msg, 'success', showClose);
    },
    // 错误消息
    errorMsg (msg, showClose) {
      this.message(msg, 'error', showClose);
    },
    // 警告消息
    warnMsg (msg, showClose) {
      this.message(msg, 'warning', showClose);
    },
    message (msg, type, showClose) {
      this.$message({
        showClose: showClose || false,
        message: msg,
        type: type
      });
    },
    // 弹窗
    confirmModel (message, url, param, callback) {
      this.ajaxBox({
        url: url,
        data: param || '',
        message: message,
        success: callback
      });
    },
    ajax (param) {
      let { type, url, data, success, isUnMusk, loading } = param;
      if (!isUnMusk) {
        this.$pcNProgress.start();
      }
      if (loading && !this.$store.getters.getAjaxLoading) {
        this.$store.dispatch('show_ajaxLoading');
      }
      if (loading && !this.$store.getters.getButtonLoading) {
        this.$store.dispatch('show_buttonLoading');
      }
      this.$http({
        method: type || 'POST',
        url: url || '',
        data: data || ''
      }).then((res) => {
        this.$pcNProgress.done();
        if (loading && this.$store.getters.getAjaxLoading) {
          this.$store.dispatch('hide_ajaxLoading');
        }
        if (loading && this.$store.getters.getButtonLoading) {
          this.$store.dispatch('hide_buttonLoading');
        }
        if (success) {
          success(res);
        } else {
          this.goBack();
        }
      }).catch((error) => {
        this.$pcNProgress.done();
        this.$loading = false;
        if (loading && this.$store.getters.getAjaxLoading) {
          this.$store.dispatch('hide_ajaxLoading');
        }
        if (loading && this.$store.getters.getButtonLoading) {
          this.$store.dispatch('hide_buttonLoading');
        }
        console.error(error);
      });
    },
    ajaxBox (param) {
      let { type, data, url, message, success, iconType, confirmButtonText, cancelButtonText, title } = param;
      if (!message) {
        alert('必须输入提示信息!');
        return;
      }
      let response;
      this.$pcMessageBox({
        title: title || '消息',
        message: message,
        showCancelButton: true,
        confirmButtonText: confirmButtonText || '确定',
        cancelButtonText: cancelButtonText || '取消',
        type: iconType || 'warning',
        closeOnPressEscape: true,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            // instance.confirmButtonText = '执行中...';
            this.ajax({
              type: type,
              url: url,
              data: data,
              success: (res) => {
                done();
                response = res;
              }
            });
            setTimeout(() => {
              instance.confirmButtonLoading = false;
            }, 400);
          } else {
            done();
          }
        }
      }).then(() => {
        if (success) {
          success(response);
        }
      }).catch((error) => {
        console.error(error);
      });
    },
    // 字段的验证，支持非空、手机、邮箱的判断
    validate (value, type) {
      // 非空验证
      if (type === 'require') {
        return !!value;
      }
      // 手机号验证
      if (type === 'phone') {
        return /^1\d{10}$/.test(value);
      }
      // 邮箱格式验证
      if (type === 'email') {
        return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
      }
      if (type === 'pwd') {
        return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(value);
      }
    }
  }
};
export default mixin;
