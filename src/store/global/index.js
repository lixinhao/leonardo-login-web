import MyCookie from '@/utils/cookie';

const global = {
  state: {
    // 桌面浏览器还是手机
    device: 'desktop',
    size: MyCookie.get('size') || 'medium'
  },
  getters: {
    size: state => state.size,
    device: state => state.device
  },
  mutations: {
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    SET_SIZE: (state, size) => {
      state.size = size;
      MyCookie.set('size', size);
    }
  },
  actions: {
    toggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device);
    },
    setSize ({ commit }, size) {
      commit('SET_SIZE', size);
    }
  }
};
export default global;
