let async = {
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
       * @param isShow 是否显示NProgress
       */
      let { type, url, data, success, isShow } = param;
      if (isShow) {
        // 开始全站进度条
        this.$myNProgress.start();
      }
      this.$http({
        method: type || 'POST',
        url: url || '',
        data: data || ''
      }).then((res) => {
        // 结束始全站进度条
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
        //TODO 需要修改如添加弹出框
        console.error(error);
      });
    },
    /**
     * MessageBox弹出框的异步请求
     * @param param
     */
    ajaxBox (param) {
      /**
       * @param type 请求类型
       * @param data 参数
       * @param url 请求地址
       * @param message MessageBox 消息正文内容
       * @param success 成功函数
       * @param iconType
       * @param confirmButtonText
       * @param cancelButtonText
       * @param title
       */
      let { type, data, url, message, success, iconType, confirmButtonText, cancelButtonText, title } = param;
      if (!message) {
        // 弹出警告框 --- 必须输入提示信息
        this.warnMsg(this.$t('validate.message'));
        return;
      }
      let response;
      this.$msgbox({
        title: title || '消息',
        message: message,
        // 是否显示取消按钮
        showCancelButton: true,
        // 确定按钮的文本内容
        confirmButtonText: confirmButtonText || this.$t('validate.form.confirm'),
        // 取消按钮的文本内容
        cancelButtonText: cancelButtonText || this.$t('validate.form.cancel'),
        // 消息类型，用于显示图标
        type: iconType || 'warning',
        // 是否可通过按下 ESC 键关闭 MessageBox
        closeOnPressEscape: true,
        // MessageBox 关闭前的回调，会暂停实例的关闭
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
        // TODO 需要修改异常弹出框
        console.error(error);
      });
    }
  }
};
export default async;
