<template>
  <div class="login">
    <el-row class="login_center" justify="center" type="flex">
      <el-col :xs="24" :sm="6" :md="8" :lg="9" :xl="6">
        <el-card class="login-box" element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-tooltip effect="dark" content="返回" placement="top-start">
            <i class="el-icon-back el_back" @click="$_config_goBack"></i>
          </el-tooltip>
          <div class="login_logo">
            <a href="#">
              <img src="~images/login/logo.png">
            </a>
          </div>
          <h1 class="title">{{ $t('register.title') }}</h1>
          <div class="register_desc">{{ $t('register.dec') }}</div>
          <el-form ref="registerForm" :model="registerForm" :rules="registerRules">
            <el-form-item prop="loginName">
              <el-input type="text" v-model="registerForm.loginName" auto-complete="off" :placeholder="$t('from.loginName')" suffix-icon="el-icon-bell" clearable></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input type="email" v-model="registerForm.email" auto-complete="off" :placeholder="$t('from.email')" suffix-icon="el-icon-message" clearable></el-input>
            </el-form-item>
            <el-form-item prop="loginPwd">
              <el-input type="password" v-model="registerForm.loginPwd" auto-complete="off" :placeholder="$t('from.loginPwd')" suffix-icon="el-icon-view" clearable></el-input>
            </el-form-item>
            <el-form-item prop="confirmPwd">
              <el-input type="password" v-model="registerForm.confirmPwd" auto-complete="off" :placeholder="$t('from.confirmPwd')" suffix-icon="el-icon-view" clearable></el-input>
            </el-form-item>
            <el-form-item prop="mobileNo">
              <el-input type="tel" v-model="registerForm.mobileNo" auto-complete="off" :placeholder="$t('from.mobileNo')" suffix-icon="el-icon-mobile-phone" clearable></el-input>
            </el-form-item>
            <el-form-item prop="imageCode">
              <el-row type="flex" justify="space-between">
                <el-col :xl="9">
                  <el-input type="text" v-model="registerForm.imageCode" :placeholder="$t('from.captchaCode')" clearable></el-input>
                </el-col>
                <el-col :xl="6" class="login_img">
                  <img v-lazy="imageCode" @click="getImage" class="login-image-code"/>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="doRegister" :loading="loading" style="width: 100%">{{ $t('register.registerIn') }}</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { UserHttp } from '@/api';

  export default {
    name: "Register",
    data () {
      return {
        loading: false,
        imageCode: '',
        deviceId: '',
        registerForm: {
          loginName: '',
          loginPwd: '',
          imageCode: ''
        },
        registerRules: {
          loginName: [{ required: true, trigger: 'blur', validator: this.$_validator_loginName() }],
          email: [{ required: true, trigger: 'blur', validator: this.$_validator_loginEmail() },
            { type: 'email', message: this.$t('validate.correctEmail'), trigger: ['blur', 'change'] }],
          loginPwd: [{ required: true, trigger: 'blur', validator: this.$_validator_loginPwd() }],
          confirmPwd: [{ required: true, trigger: 'blur', validator: this.$_validator_confirmPwd() }],
          mobileNo: [{ required: true, trigger: 'blur', validator: this.$_validator_mobileNo() },
            { type: 'number', trigger: 'blur', message: this.$t('validate.number') },
            { pattern: /^1[3456789]\d{9}$/, trigger: 'blur', message: this.$t('validate.mobileNo.pattern') }],
          imageCode: [{ required: true, trigger: 'blur', message: this.$t('validate.captchaCode') }]
        },
      };
    },
    created () {
      this.getImage();
    },
    methods: {
      getImage () {
        // let that = this;
        // that.deviceId = new Date().getTime();
        // this.$http({
        //   method: 'POST',
        //   url: '/uac/auth/code/image',
        //   headers: {
        //     'deviceId': that.deviceId
        //   },
        //   data: ''
        // }).then((res) => {
        //   that.imageCode = 'data:image/jpg;base64,' + res.result;
        // });
      },
      doRegister () {
        // 表单验证
        this.$refs.registerForm.validate((valid, object) => {
          if (valid) {
            this.register(() => {
              this.successMsg('注册成功, 请登录邮箱激活用户');
              this.$_config_loadPage('Login');
            });
          }
        })
      },
      /**
       * 注册
       * @param resolve
       */
      register (resolve) {
        UserHttp.register(this.registerForm).then((res) => {
          this.getImage();
          if (res) {
            resolve(res);
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      /**
       * 用户名校验
       */
      $_validator_loginName () {
        return (rule, value, callback) => {
          if (!value) {
            callback(new Error(this.$t('validate.loginName')));
          } else {
            // TODO
            //校验登录名是否存在
            // this.$_validator_checkValid('loginName', this.registerForm.loginName, (res) => {
            //   if (!res.result) {
            //     callback(new Error(this.$t('validate.server.loginName')));
            //   }
            // });
            callback();
          }
        };
      },
      /**
       * 邮箱校验
       */
      $_validator_loginEmail () {
        return (rule, value, callback) => {
          if (!value) {
            callback(new Error(this.$t('validate.email')));
          } else {
            //TODO
            //校验邮箱是否存在
            // this.$_validator_checkValid('email', this.registerForm.email, (res) => {
            //   if (!res.result) {
            //     callback(new Error(this.$t('validate.server.email')));
            //   }
            // });
            callback();
          }
        };
      },
      /**
       * 密码校验
       */
      $_validator_loginPwd () {
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
       */
      $_validator_confirmPwd () {
        return (rule, value, callback) => {
          if (!value) {
            callback(new Error(this.$t('validate.loginPwd')));
          } else {
            if (this.registerForm.loginPwd !== this.registerForm.confirmPwd) {
              callback(new Error(this.$t('validate.confirmPwd')));
            }
            callback();
          }
        };
      },
      /**
       *  手机号校验
       */
      $_validator_mobileNo () {
        return (rule, value, callback) => {
          if (!value) {
            callback(new Error(this.$t('validate.mobileNo.required')));
          } else {
            //TODO
            //校验手机号是否存在
            // this.$_validator_checkValid('mobileNo', this.registerForm.mobileNo, (res) => {
            //   if (!res.result) {
            //     callback(new Error(this.$t('validate.server.mobileNo')));
            //   }
            // });
            callback();
          }
        };
      },
    },
    computed: {}
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/style/views/auth/user-login";

  .register_desc {
    color: #aba5b6;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .el_back {
    cursor: pointer;
  }

</style>

