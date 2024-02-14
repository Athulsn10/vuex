// store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    iceCreams: [],
    itemsInCart: 0,
    isCart: false,
  },
  getters: {
    getIceCreams: (state) => state.iceCreams,
    getItemsInCart: (state) => state.itemsInCart,
    getIsCart: (state) => state.isCart,
  },
  mutations: {
    setIceCreams(state, iceCreams) {
      state.iceCreams = iceCreams;
    },
    setItemsInCart(state, count) {
      state.itemsInCart = count;
    },
    setIsCart(state, value) {
      state.isCart = value;
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
    updateItemsInCart({ commit, dispatch, state }) {
      dispatch('getData') // Dispatch the getData action
        .then(() => {
          const fav = state.iceCreams.filter((iceCream) => iceCream.cart === true);
          const count = fav.length;
          commit('setItemsInCart', count);
        })
        .catch((error) => {
          console.error('Error updating items in cart:', error);
        });
    },
    toggleCart({ commit, state }) {
      const newValue = !state.isCart;
      commit('setIsCart', newValue);
    },
  },
  modules: {},
});
