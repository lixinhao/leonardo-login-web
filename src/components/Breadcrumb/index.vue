<template>
  <!--separator 显示的分隔符-->
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ generateTitle(item.meta.title) }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ generateTitle(item.meta.title) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  // url 字符串的正则表达式
  import pathToRegexp from 'path-to-regexp';
  import { generateTitle } from '@/utils';

  export default {
    data () {
      return {
        // 面包屑的列表
        levelList: null
      }
    },
    watch: {
      $route () {
        this.getBreadcrumb()
      }
    },
    created () {
      this.getBreadcrumb()
    },
    methods: {
      generateTitle,
      /**
       * 获取面包屑
       */
      getBreadcrumb () {
        let matched = this.$route.matched.filter(item => {
          if (item.name) {
            return true
          }
        });
        const first = matched[0];
        if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
          matched = [{ path: '/dashboard', meta: { title: 'dashboard' } }].concat(matched);
        }
        this.levelList = matched
      },
      pathCompile (path) {
        const { params } = this.$route;
        // 快速填充 url 字符串的参数值
        return pathToRegexp.compile(path)(params);
      },
      handleLink (item) {
        const { redirect, path } = item;
        if (redirect) {
          this.$router.push(redirect);
          return
        }
        this.$router.push(this.pathCompile(path))
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }

  }
</style>
