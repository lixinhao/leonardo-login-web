let asyncAjax = {
  data () {
    return {};
  },
  methods: {
    /**
     * ajax请求
     *
     * @param param
     */
    ajax (param) {
      /**
       * @param type 请求类型
       * @param url 请求地址
       * @param data 参数
       * @param success 请求成功
       * @param isUnMust 是否显示NProgress
       *
       */
      let { type, url, data, success, isUnMust } = param;
      if (!isUnMust) {
        this.$myNProgress.start();
      }
      this.$http({
        method: type || 'POST',
        url: url || '',
        data: data || ''
      }).then((res) => {
        this.$myNProgress.done();
        if (success) {
          success(res);
        } else {
          this.goBack();
        }
      }).catch((error) => {
        this.$myNProgress.done();
        //关闭Element 的loading
        this.$loading = false;
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
    }
  }
};
export default asyncAjax;
