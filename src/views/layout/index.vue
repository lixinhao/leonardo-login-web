<template>
  <el-container>
    <el-aside >
      <sidebar class="sidebar-container"/>
    </el-aside>
    <el-container>
      <el-header>
        <navbar/>
        <tags-view/>
      </el-header>
      <el-main>
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
          mobile: this.device === this.$myEnum.GLOBAL.DEVICE.MOBILE
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
