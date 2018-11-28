let validator = {
  data () {
    return {};
  },
  methods: {
    /**
     * 后台请求校验参数
     * @param resolve 成功回调
     * @param validValue 校验的参数值
     * @param type 参数类型
     */
    $_validator_checkValid (validValue, type, resolve) {
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
