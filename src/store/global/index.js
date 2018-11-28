import { enums, MyCookie } from '@/utils';

const global = {
  state: {
    // 桌面浏览器还是手机
    device: enums.GLOBAL.DEVICE.DESKTOP,
    size: MyCookie.get(enums.GLOBAL.SIZE) || 'medium'
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
      MyCookie.set({ key: enums.GLOBAL.SIZE, value: size });
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
