<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <!--show-timeout: 展开 sub-menu 的延时-->
    <!--default-active: 当前激活菜单的 index  $route.path 字符串，等于当前路由对象的路径-->
    <!--collapse: 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）-->
    <!--mode: 模式-->
    <!--background-color:	菜单的背景色（仅支持 hex 格式）-->
    <!--text-color:	菜单的文字颜色（仅支持 hex 格式）-->
    <!--active-text-color: 当前激活菜单的文字颜色（仅支持 hex 格式）-->
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './sidebarItem'

  export default {
    components: { SidebarItem },
    // 发生了改变,就会触发
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      // 是否水平折叠收起菜单
      isCollapse () {
        return !this.sidebar.opened
      }
    }
  }
</script>
