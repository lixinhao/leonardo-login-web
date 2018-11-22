let msg = {
  data () {
    return {};
  },
  methods: {
    /**正常消息*/
    infoMsg (msg, showClose) {
      this.message(msg, 'info', showClose);
    },
    /**成功的消息*/
    successMsg (msg, showClose) {
      this.message(msg, 'success', showClose);
    },
    /**错误消息*/
    errorMsg (msg, showClose) {
      this.message(msg, 'error', showClose);
    },
    /**警告消息*/
    warnMsg (msg, showClose) {
      this.message(msg, 'warning', showClose);
    },
    /**弹出框*/
    confirmModel (message, url, param, callback) {
      this.ajaxBox({
        url: url,
        data: param || '',
        message: message,
        success: callback
      });
    },
    /**
     * 消息框
     * @param msg 消息文字
     * @param type 主题 success/warning/info/error
     * @param showClose 是否显示关闭按钮
     */
    message (msg, type, showClose) {
      this.$message({
        showClose: showClose || false,
        message: msg,
        type: type
      });
    }
  }
};
export default msg;
