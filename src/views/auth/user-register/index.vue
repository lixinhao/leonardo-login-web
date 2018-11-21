<template>
  <div class="login">
    <el-row class="login_center" justify="center" type="flex">
      <el-col :xs="24" :sm="6" :md="8" :lg="9" :xl="6">
        <el-card class="login-box" element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-tooltip effect="dark" content="返回" placement="top-start">
            <i class="el-icon-back el_back" @click="goBack"></i>
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
            <el-form-item prop="captchaCode">
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
          captchaCode: ''
        },
        registerRules: {
          loginName: [{ required: true, trigger: 'blur', validator: this.validatorLoginName() }],
          email: [{ required: true, trigger: 'blur', validator: this.validatorLoginEmail() }, { type: 'email', message: this.$t('validate.correctEmail'), trigger: ['blur', 'change'] }],
          loginPwd: [{ required: true, trigger: 'blur', validator: this.validatorLoginPwd() }],
          confirmPwd: [{ required: true, trigger: 'blur', validator: this.validatorConfirmPwd() }],
          mobileNo: [{ required: true, trigger: 'blur', validator: this.validatorMobileNo() }],
          captchaCode: [{ required: true, trigger: 'blur', message: this.$t('validate.captchaCode') }]
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
        this.$refs.loginForm.validate(valid => {
          if (!valid) {
            this.loading = true;
            this.login();
          } else {
            return false
          }
        })
      },
    }
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

