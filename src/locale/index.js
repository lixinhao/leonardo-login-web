import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import elementEnLocale from 'element-ui/lib/locale/lang/en';
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';
import enLocale from './lang/en';
import zhLocale from './lang/zh';

Vue.use(VueI18n);
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
};
const i18n = new VueI18n({
  // 语言标识
  locale: Cookies.get('language') || 'zh',
  // 设置语言环境信息
  messages
});
export default i18n;
