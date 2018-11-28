// vue-i18n国际化 循环侧边栏导航
export function generateTitle (title) {
  // 需要翻译的key在你提供的语言包(messages)中是否存在.
  const hasKey = this.$te('route.' + title);
  if (hasKey) {
    return this.$t('route.' + title);
  }
  return title;
}
