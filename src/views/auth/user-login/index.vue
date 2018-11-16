<template>
  <div class="login">
    <el-row class="login_center" justify="center" type="flex">
      <el-col :xs="24" :sm="6" :md="8" :lg="9" :xl="6">
        <el-card class="login-box" element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-tooltip effect="dark" content="语言切换" placement="top-start">
            <lang-select class="set-language"></lang-select>
          </el-tooltip>
          <div class="login_logo">
            <a href="#">
              <img src="~images/login/logo.png">
            </a>
          </div>
          <h1 class="title">{{ $t('login.title') }}</h1>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
            <el-form-item prop="loginName">
              <el-input type="text" v-model="loginForm.loginName" auto-complete="off" :placeholder="$t('from.loginName')" suffix-icon="el-icon-bell" clearable></el-input>
            </el-form-item>
            <el-form-item prop="loginPwd">
              <el-input type="password" v-model="loginForm.loginPwd" auto-complete="off" :placeholder="$t('from.loginPwd')" suffix-icon="el-icon-view" clearable></el-input>
            </el-form-item>
            <el-form-item prop="captchaCode">
              <el-row type="flex" justify="space-between">
                <el-col :xl="9">
                  <el-input type="text" v-model="loginForm.captchaCode" :placeholder="$t('from.captchaCode')" clearable></el-input>
                </el-col>
                <el-col :xl="6" class="login_img">
                  <img v-lazy="imageCode" @click="getImage" class="login-image-code"/>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row class="login_row">
                <el-col :xl="12" :xs="12" :sm="12" :md="12" :lg="12">
                  <el-checkbox :checked="rememberMe" @change="rememberMeFn" class="login_remember_me">{{ $t('login.rememberMe') }}</el-checkbox>
                </el-col>
                <el-col :xl="12" :xs="12" :sm="12" :md="12" :lg="12" class="login_forget_pwd">
                  <a class="m-link" @click="loadPage('ResetPwdEmail')">{{ $t('login.forgetPwd') }}</a>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="el_form_item_margin">
              <el-button type="primary" @click="doLogin" :loading="loading">{{ $t('login.logIn') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-row type="flex" justify="end">
                <el-col :span="6" class="el_text_end el_form_item_margin">
                  <a class="m-link" @click="loadPage('Register')">{{ $t('login.register') }}</a>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <social-sign></social-sign>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import LangSelect from '@/components/LangSelect';
  import SocialSign from './social-sign';

  export default {
    name: "Login",
    components: { LangSelect, SocialSign },
    data () {
      const validateLoginName = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('validate.loginName')))
        } else {
          callback()
        }
      };
      const validateLoginPwd = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error(this.$t('validate.loginPwd')))
        } else {
          callback()
        }
      };
      const validateCaptchaCode = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error(this.$t('validate.captchaCode')))
        } else {
          callback()
        }
      };
      return {
        loading: false,
        imageCode: '',
        deviceId: '',
        loginForm: {
          loginName: '',
          loginPwd: '',
          captchaCode: ''
        },
        loginRules: {
          loginName: [{ required: true, trigger: 'blur', validator: validateLoginName }],
          loginPwd: [{ required: true, trigger: 'blur', validator: validateLoginPwd }],
          captchaCode: [{ required: true, trigger: 'blur', validator: validateCaptchaCode }],
        },
      };
    },
    // 编译好页面后执行
    mounted () {
      this.getImage();
    },
    methods: {
      // 点击登录按钮
      doLogin () {
        // 表单验证
        this.$refs.loginForm.validate(valid => {
          if (!valid) {
            this.loading = true;
            this.login();
          } else {
            return false
          }
        })
      },
      // 登录请求
      login () {
        let loginName = this.loginForm.loginName;
        let loginPwd = this.loginForm.loginPwd;
        this.$http({
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'deviceId': this.deviceId
          },
          url: '/uac/auth/form',
          auth: {
            username: 'leonardo-client-uac',
            password: 'leonardoClientSecret'
          },
          params: {
            username: loginName,
            password: loginPwd,
            imageCode: this.loginForm.captchaCode
          }
        }).then((res) => {
          this.loading = false;
          // 刷新验证码
          this.getImage();
          if (res && res.code === 200) {
            this.$message({
              showClose: true,
              message: '登录成功',
              type: 'success'
            });
            // 更新认证Token
            this.$store.dispatch('update_auth_token', res.result);
            window.location.href = this.redirectUri;
          } else {
            this.$message({
              showClose: true,
              message: '登录失败',
              type: 'warning'
            });
          }
        }).catch((err) => {
          this.$message({
            showClose: true,
            message: '系统异常',
            type: 'error'
          });
          console.log(err);
        });
      },
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
      rememberMeFn () {
        // 本地更新'记住我'
        this.$store.dispatch('update_remember_me');
      }
    },
    computed: {
      // 获取'记住我'
      rememberMe () {
        return this.$store.getters.getRememberMe;
      },
      // 获取重定向URL
      redirectUri () {
        return this.$store.getters.getRedirectUri;
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/style/views/auth/user-login";
</style>
