<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size"/>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="size==='medium'" command="medium">Medium</el-dropdown-item>
      <el-dropdown-item :disabled="size==='small'" command="small">Small</el-dropdown-item>
      <el-dropdown-item :disabled="size==='mini'" command="mini">Mini</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    computed: {
      size () {
        return this.$store.getters.size
      }
    },
    methods: {
      handleSetSize (size) {
        this.$ELEMENT.size = size;
        this.$store.dispatch('setSize', size);
        this.refreshView();
        // TODO 需要国际化
        this.successMsg('Switch Size Success');
      },
      refreshView () {
        // 为了使缓存页面重新呈现
        this.$store.dispatch('delAllCachedViews', this.$route);
        const { fullPath } = this.$route;
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      }
    }
  }
</script>

<style scoped>
  .size-icon {
    font-size: 20px;
    cursor: pointer;
    vertical-align: -4px !important;
  }
</style>

