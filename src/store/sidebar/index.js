import { enums, MyCookie } from '@/utils';

const sidebar = {
  state: {
    sidebar: {
      // !+ 转为数字  判断STATUS的值是否为‘不是0的纯数字字符串’，如果否，则为真
      // 当数字为 0 或者 NaN 时返回 true
      opened: !+MyCookie.get(enums.SIDEBAR.STATUS),
      withoutAnimation: false
    }
  },
  getters: {
    sidebar: state => state.sidebar
  },
  mutations: {
    // 点击侧边栏按钮
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        MyCookie.set(enums.SIDEBAR.STATUS, 1);
      } else {
        MyCookie.set(enums.SIDEBAR.STATUS, 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    },
    // 关闭
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      MyCookie.set(enums.SIDEBAR.STATUS, 1);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    }
  },
  actions: {
    toggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
    closeSideBar ({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation);
    }
  }
};
export default sidebar;
