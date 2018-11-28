<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">

    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <jump-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon" :title="generateTitle(onlyOneChild.meta.title)"/>
        </el-menu-item>
      </jump-link>
    </template>

    <el-submenu v-else ref="submenu" :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="generateTitle(item.meta.title)"/>
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu"/>

        <jump-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child.meta" :icon="child.meta.icon" :title="generateTitle(child.meta.title)"/>
          </el-menu-item>
        </jump-link>
      </template>
    </el-submenu>

  </div>
</template>

<script>
  import path from 'path';
  import Item from './item';
  import JumpLink from '../jumpLink';
  import { generateTitle } from '@/utils/i18n';

  export default {
    name: 'SidebarItem',
    components: { Item, JumpLink },
    props: {
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        onlyOneChild: null
      }
    },
    methods: {
      generateTitle,
      hasOneShowingChild (children, parent) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // 如果只有一个子集
            this.onlyOneChild = item;
            return true
          }
        });
        // 当只有一个子路由器时，默认情况下显示子路由器
        if (showingChildren.length === 1) {
          return true
        }
        // 如果没有子路由器显示，则显示父节点
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
          return true
        }
        return false
      },
      resolvePath (routePath) {
        if (this.$_config_isExternal(routePath)) {
          return routePath
        }
        return path.resolve(this.basePath, routePath)
      }
    }
  }
</script>
