<template>
  <el-container>
    <el-aside>Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <navbar/>
        <tags-view/>
        <app-main/>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
  import { AppMain, Navbar, Sidebar, TagsView } from './components'

  export default {
    name: 'Layout',
    components: {
      Navbar,
      Sidebar,
      AppMain,
      TagsView
    },
    computed: {
      sidebar () {
        return this.$store.state.app.sidebar
      },
      device () {
        return this.$store.state.app.device
      },
      classObj () {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    methods: {
      handleClickOutside () {
        this.$store.dispatch('closeSideBar', { withoutAnimation: false })
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
