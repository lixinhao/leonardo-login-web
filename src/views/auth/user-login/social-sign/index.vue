<template>
  <el-row type="flex" justify="start">
    <el-col :span="7">
      <div>其他方式登录:</div>
    </el-col>
    <el-col :span="15">
        <div class="sign-btn" @click="wechatHandleClick('wechat')">
          <span class="wx-svg-container"><svg-icon icon-class="wechat" class="icon"></svg-icon></span>
        </div>
        <div class="sign-btn" @click="tencentHandleClick('tencent')">
          <span class="qq-svg-container"><svg-icon icon-class="qq" class="icon"></svg-icon></span>
        </div>
    </el-col>
  </el-row>

</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .sign-btn {
    display: inline-block;
    cursor: pointer;
  }

  .icon {
    color: #fff;
    font-size: 24px;
  }

  .wx-svg-container,
  .qq-svg-container {
    display: inline;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 8px 5px 3px 6px;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-right: 5px;
  }

  .wx-svg-container {
    background-color: #8ada53;
  }

  .qq-svg-container {
    background-color: #6BA2D6;
  }

</style>

<script>
  export default {
    name: 'SocialSignin',
    methods: {
      wechatHandleClick (thirdpart) {
        alert('ok')
      },
      tencentHandleClick (thirdpart) {
        alert('ok')
      }
    }
  }
</script>
