<template>
  <div class="login">
    <el-row style="padding: 10% 2rem 1rem 2rem;margin: 0 auto 2rem auto;" justify="center" type="flex">
      <el-col :model="user" :xs="24" :sm="6" :md="8" :lg="9" :xl="6">
        <el-card class="login-box" v-loading="$store.state.loading" element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-form>
            <lang-select class="set-language"></lang-select>
            <div class="login_logo">
              <a href="#">
                <img src="~images/login/logo.png">
              </a>
            </div>
            <h1 class="title">{{ $t('login.title') }}</h1>
            <el-form-item>
              <el-input type="text" v-model="user.userName" auto-complete="off" placeholder="请输入用户名..." suffix-icon="el-icon-bell"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="password" v-model="user.password" auto-complete="off" placeholder="请输入密码..." suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login" :loading="$store.state.loading" class="pull-right" style="width:100%">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style>
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

  export default {
    name: "Login",
    components: { LangSelect },
    data () {
      return {
        user: {
          userName: "",
          password: ""
        }
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
