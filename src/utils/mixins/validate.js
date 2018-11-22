/**
 * 表单校验
 */
let validator = {
  data () {
    return {};
  },
  methods: {
    /**
     * 用户名校验
     * @returns {Function}
     */
    validatorLoginName () {
      return (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('validate.loginName')));
        } else {
          //校验登录名是否存在
          this.checkValid('loginName', this.registerForm.loginName, (res) => {
            if (!res.result) {
              callback(new Error(this.$t('validate.server.loginName')));
            }
          });
          callback();
        }
      };
    },
    /**
     * 邮箱校验
     * @returns {Function}
     */
    validatorLoginEmail () {
      return (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('validate.email')));
        } else {
          //校验邮箱是否存在
          this.checkValid('email', this.registerForm.email, (res) => {
            if (!res.result) {
              callback(new Error(this.$t('validate.server.email')));
            }
          });
          callback();
        }
      };
    },
    /**
     * 密码校验
     * @returns {Function}
     */
    validatorLoginPwd () {
      return (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('validate.loginPwd')));
        } else {
          callback();
        }
      };
    },
    /**
     * 确认密码校验
     * @returns {Function}
     */
    validatorConfirmPwd () {
      return (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('validate.loginPwd')));
        } else {
          callback();
        }
      };
    },
    /**
     *  手机号校验
     * @returns {Function}
     */
    validatorMobileNo () {
      return (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('validate.mobileNo')));
        } else {
          //校验手机号是否存在
          this.checkValid('mobileNo', this.registerForm.mobileNo, (res) => {
            if (!res.result) {
              callback(new Error(this.$t('validate.server.mobileNo')));
            }
          });
          callback();
        }
      };
    },
    /**
     * 后台请求校验参数
     * @param resolve 成功回调
     * @param validValue 校验的参数值
     * @param type 参数类型
     */
    checkValid (validValue, type, resolve) {
      this.ajax({
        url: `/uac/auth/checkValid`,
        data: {
          validValue: validValue,
          type: type
        },
        success: resolve
      });
    }
  }
};
export default validator;
