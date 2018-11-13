import Cookies from 'js-cookie';

const layout = {
  state: {
    language: Cookies.get('language') || 'en'
  },
  mutations: {
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
export default layout;