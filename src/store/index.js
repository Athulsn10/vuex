import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    iceCreams: [],
  },
  getters: {
    getIceCreams: (state) => state.iceCreams,
  },
  mutations: {
    setIceCreams(state, iceCreams) {
      state.iceCreams = iceCreams;
    },
  },
  actions: {
    async getData({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/iceCreams');
        commit('setIceCreams', response.data);
        return response.data; 
      } catch (error) {
        console.error('Error fetching ice creams:', error);
        throw error;
      }
    },
  },
  modules: {},
});
