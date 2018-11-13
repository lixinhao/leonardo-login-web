// 状态:用来存放数据
const state = {
  ajaxLoading: false,
  buttonLoading: false,
  notice: {
    show: false,
    options: {
      autoClose: false,
      countdownBar: false,
      content: 'notice content'
    }
  }
};
// 状态的Getter方法 this.$store.getters.xxx来绑定数据
const getters = {
  getAjaxLoading: state => state.ajaxLoading,
  getButtonLoading: state => state.buttonLoading,
  getNoticeShow: state => state.notice.show,
  getNoticeOptions: state => state.notice.options
};
const mutations = {
  showAjaxLoading (state) {
    state.ajaxLoading = true;
  },
  hideAjaxLoading (state) {
    state.ajaxLoading = false;
  },
  showButtonLoading (state) {
    state.buttonLoading = true;
  },
  hideButtonLoading (state) {
    state.buttonLoading = false;
  },
  newNotice (state, options) {
    state.notice.show = true;
    state.notice.options = options;
  },
  closeNotice (state) {
    state.notice.show = false;
    state.notice.options = {};
  }
};
const actions = {
  show_ajaxLoading: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit('showAjaxLoading');
      resolve();
    });
  },
  hide_ajaxLoading: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit('hideAjaxLoading');
      resolve();
    });
  },
  show_buttonLoading: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit('showButtonLoading');
      resolve();
    });
  },
  hide_buttonLoading: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit('hideButtonLoading');
      resolve();
    });
  },
  new_notice ({ commit }, options) {
    commit('newNotice', options);
  },
  close_notice ({ commit }) {
    commit('closeNotice');
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
