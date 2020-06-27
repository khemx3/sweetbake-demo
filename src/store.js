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
			address1: "66/1023",
			district: "บางเมือง",
			amphoe: "เมืองสมุทรปราการ",
			province: "สมุทรปราการ",
			zipcode: "10270",
		},
	},
	mutations: {
		SET_ORDERCARD(state, payload) {
			state.ordercard = payload;
		},
		SET_ADDRESS(state, payload) {
			state.address = payload;
		},
	},
	getters : {
		addressDetail: state => state.name.address
	}
});
