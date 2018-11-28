import { Message as $message } from 'element-ui';

class Model {
  /**
   * 消息框
   * @param msg 消息文字
   * @param type 主题 success/warning/info/error
   * @param showClose 是否显示关闭按钮
   */
  static $msg (msg, type, showClose) {
    $message({
      showClose: showClose || false,
      message: msg,
      type: type
    });
  }

  /**正常消息*/
  infoMsg (msg, showClose) {
    this.$msg(msg, 'info', showClose);
  }

  /**成功的消息*/
  successMsg (msg, showClose) {
    this.$msg(msg, 'success', showClose);
  }

  /**错误消息*/
  errorMsg (msg, showClose) {
    this.$msg(msg, 'error', showClose);
  }

  /**警告消息*/
  warnMsg (msg, showClose) {
    this.$msg(msg, 'warning', showClose);
  }

  /**弹出框*/
  confirmModel (message, url, param, callback) {
    this.ajaxBox({
      url: url,
      data: param || '',
      message: message,
      success: callback
    });
  }
}

export default new Model();
