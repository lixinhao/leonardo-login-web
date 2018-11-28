<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language"></svg-icon>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    computed: {
      language () {
        return this.$store.getters.language
      }
    },
    methods: {
      handleSetLanguage (lang) {
        let mes ;
        this.$i18n.locale = lang;
        this.$store.dispatch('setLanguage', lang);
        if (lang === 'en') {
          mes = 'Switch Language Success';
        }
        if (lang === 'zh') {
          mes = '语言切换成功';
        }
        this.successMsg(mes)
      }
    }
  }
</script>

<style scoped>
  .international-icon {
    font-size: 20px;
    cursor: pointer;
    vertical-align: -5px !important;
  }
</style>

