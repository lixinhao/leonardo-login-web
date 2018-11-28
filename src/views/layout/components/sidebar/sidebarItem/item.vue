<script>
  export default {
    name: 'MenuItem',
    // 无状态 (没有响应式数据)，无实例 (没有 this 上下文)
    functional: true,
    //  prop 动态生成标签的组件
    props: {
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    },
    render (h, context) {
      const { icon, title } = context.props;
      const vnodes = [];
      if (icon) {
        vnodes.push('<svg-icon icon-class={icon}/>');
      }
      if (title) {
        vnodes.push("<span slot='title'>{(title)}</span>");
      }
      return vnodes
    }
  }
</script>
