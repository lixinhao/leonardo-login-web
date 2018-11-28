import Cookies from 'js-cookie';

const language = {
  state: {
    language: Cookies.get('language') || 'en'
  },
  getters: {
    language: state => state.language
  },
  mutations: {
    /**
     * 设置语言
     */
    SET_LANGUAGE: (state, language) => {
      state.language = language;
      Cookies.set('language', language);
    }
  },
  actions: {
    setLanguage ({ commit }, language) {
      commit('SET_LANGUAGE', language);
    }
  }
};
export default language;
