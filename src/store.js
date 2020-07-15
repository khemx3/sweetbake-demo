import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		url:"https://asia-east2-sweetbake-backend.cloudfunctions.net/api",
		accessToken: "",
		address: {
			name: "",
			contact: "",
			address1: "",
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
		round: {
			name: "เลือกรอบส่ง",
			id: "",
			type: "",
		},
		lockingOrder: true,
		pickup: false,
		menu: [
			{
				id: "7btee1m7i",
				name: "Nutella Brownies",
				count: 0,
				url:
					"https://www.img.in.th/images/1c84cdcb4935c6eb6c7c7501055d170d.jpg",
			},
			{
				id: "sorq6ezsm",
				name: "Nutella Cup",
				url:
					"https://www.img.in.th/images/541999340d24c09282bc9130d2c78752.jpg",
				count: 0,
			},
			{
				id: "9vqkg6f1l",
				name: "Combo Set",
				url:
					"https://www.img.in.th/images/6be5c9719af116c54434c91f071b6c06.jpg",
				count: 0,
			},
		],
		cart: [],
	},
	mutations: {
		SET_ACCESSTOKEN(state, token) {
			state.accessToken = token
		},
		SET_ROUND(state, payload) {
			state.round = payload
		},
		SET_ADDRESS(state, payload) {
			state.address = payload;
		},
		SET_LINEUSER(state, payload) {
			state.profile = payload;
		},
		EDIT_COUNT_INCREASE(state, data) {
			const index = state.menu.findIndex((item) => item.id === data.id);
			state.menu[index].count++;
		},
		EDIT_COUNT_DECREASE(state, data) {
			const index = state.menu.findIndex((item) => item.id === data.id);
			state.menu[index].count--;
		},
		ADD_CART(state, menu) {
			if (state.cart.find((item) => item.id === menu.id)) {
				state.cart.find((item) => item.id) == menu;
			} else {
				state.cart.push(menu);
			}
		},
		CLEAR_CART(state) {
			state.cart = [];
			state.menu.forEach((item) => {
				item.count = 0;
			});
		},
		changeLockOrderState(state, status) {
			state.lockingOrder = status;
		},
		SET_PICKUP(state, payload) {
			state.pickup = payload
		}
	},
	getters: {
		addressDetail: (state) => state.name.address,
	},
});
