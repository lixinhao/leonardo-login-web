<template>
  <div class="login">
    <el-row class="login_center" justify="center" type="flex">
      <el-col :model="user" :xs="24" :sm="6" :md="8" :lg="9" :xl="6">
        <el-card class="login-box" v-loading="$store.state.loading" element-loading-background="rgba(0, 0, 0, 0.8)">
          <lang-select class="set-language"></lang-select>
          <div class="login_logo">
            <a href="#">
              <img src="~images/login/logo.png">
            </a>
          </div>
          <h1 class="title">{{ $t('login.title') }}</h1>
          <el-form>
            <el-form-item>
              <el-input type="text" v-model="user.userName" auto-complete="off" :placeholder="$t('from.userName')" suffix-icon="el-icon-bell" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="password" v-model="user.password" auto-complete="off" :placeholder="$t('from.password')" suffix-icon="el-icon-edit" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-row type="flex" justify="start">
                <el-col :xl="6">
                  <el-input type="text" v-model="user.captchaCode" placeholder="验证码" clearable></el-input>
                </el-col>
                <el-col :xl="6" class="login_img">
                  <img src="~images/login/logo.png">
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row class="login_row">
                <el-col :xl="12" :xs="12" :sm="12" :md="12" :lg="12">
                  <el-checkbox v-model="checked" class="login_remember_me">{{ $t('login.rememberMe') }}</el-checkbox>
                </el-col>
                <el-col :xl="12" :xs="12" :sm="12" :md="12" :lg="12" class="login_forget_pwd">
                  <a class="m-link" @click="loadPage('ResetPwdEmail')">{{ $t('login.forgetPwd') }}</a>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="el_form_item_margin">
              <el-button type="primary" @click="login" :loading="$store.state.loading">{{ $t('login.logIn') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-row type="flex" justify="end">
                <el-col :span="6" class="el_text_end el_form_item_margin">
                  <a class="m-link" @click="loadPage('ResetPwdEmail')">{{ $t('login.register') }}</a>
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
<style>
  .el_text_end {
    text-align: end;
  }

  .el_text_start {
    text-align: start;
  }

  .el_form_item_margin {
    margin-top: -22px;
  }

  .el_form_item_margin button {
    width: 100%;
  }

  .login_center {
    padding: 10% 2rem 1rem 2rem;
    margin: 0 auto 2rem auto;
  }

  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .m-link {
    color: #aba5b6;
    text-decoration: none;
    position: relative;
    display: inline-block;
  }

  .m-link:after {
    display: block;
    content: '';
    position: absolute;
    bottom: 10px;
    top: 0;
    left: 0;
    /*开始时候下划线的宽度为0*/
    width: 0;
    -webkit-transition: width 0.3s ease;
    /*这里我们设定所有改变都有动画效果，可以自己指定样式才有动画效果*/
    transition: width 0.3s ease;
  }

  .m-link:hover {
    text-decoration: none !important
  }

  .m-link:hover:after {
    width: 100%
  }

  .m-link:hover {
    color: #776e87
  }

  .m-link:hover:after {
    border-bottom: 1px solid #776e87;
    opacity: .3;
    filter: alpha(opacity=30)
  }

  .login_remember_me {
    color: #aba5b6;
  }

  .login_row {
    margin-top: -30px;
    padding-left: 7px;
    padding-right: 7px;
  }

  .login_img {
    text-align: right;
  }

  .login_img img {
    height: 36px;
    width: 120px;
  }

  .login_forget_pwd {
    text-align: right;
    color: #aba5b6;
  }

  .login_logo {
    text-align: center;
    margin: 0 auto;
  }

  .login {
    /**把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。背景图像的某些部分也许无法显示在背景定位区域中*/
    background-size: cover;
    background: url(~images/login/bg.jpg) no-repeat center center fixed;
    width: 100%;
    height: 100%;
    position: fixed;
  }

  .login-box {
    background: #ffffff;
    border: none;
  }

  .login-box-msg {
    color: #000000;
    text-align: center;
  }

  .login-box .title {
    color: #000000;
    text-align: center;
  }
</style>
<script>
  import LangSelect from '@/components/LangSelect'
  import SocialSign from './social-sign'

  export default {
    name: "Login",
    components: { LangSelect, SocialSign },
    data () {
      return {
        user: {
          userName: "",
          password: "",
          captchaCode: ""
        },
        checked: false
      };
    },
    methods: {
      login () {
        this.$http.post("/passport/signIn", this.user).then(res => {
          if (res.data.token) {
            this.$store.commit("setToken", res.data.token);
            this.$router.push({ path: "/dashboard" });
          }
        });
      }
    }
  };
</script>
