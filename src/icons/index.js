import Vue from 'vue';
// svg组件
import SvgIcon from '@/components/SvgIcon';
// 注册
Vue.component('svg-icon', SvgIcon);
/**
 * require.context有三个参数：
 * directory：说明需要检索的目录
 * useSubdirectories：是否检索子目录
 * regExp: 匹配文件的正则表达式
 */
const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
