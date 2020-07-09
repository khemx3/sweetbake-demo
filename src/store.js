import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		ordercard: {
			id: 0,
			name: "",
			date: "",
			type: "",
		},
		address: {
			address1: "aaa",
			district: "",
			amphoe: "",
			province: "",
			zipcode: "",
		},
		profile: {
			userId: "",
			displayName: "",
			pictureUrl: "",
			statusMessage: "",
		},
	},
	mutations: {
		SET_ORDERCARD(state, payload) {
			state.ordercard = payload;
		},
		SET_ADDRESS(state, payload) {
			state.address = payload;
		},
		SET_LINEUSER(state, payload) {
			state.profile = payload
		}
	},
});
