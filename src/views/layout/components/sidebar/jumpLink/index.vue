<template>
  <!-- eslint-disable vue/require-component-is-->
  <component v-bind="linkProps(to)">
    <!--分发内容-->
    <slot/>
  </component>
</template>

<script>
  export default {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    methods: {
      linkProps (url) {
        if (this.$_config_isExternal(url)) {
          return {
            is: 'a',
            href: url,
            target: '_blank',
            rel: 'noopener'
          }
        }
        return {
          is: 'router-link',
          to: url
        }
      }
    }
  }
</script>
