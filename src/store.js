import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ordercard: {
      id: 0,
      name: "",
      date: "",
      type: "",
  }
  },
  mutations: {
    SET_ORDERCARD (state, payload) {
      state.ordercard = payload
    },
  },
})
