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
          // 校验登录名是否存在

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
          callback();
        }
      };
    }
  }
};
export default validator;
