<template>
	<div>
		<div class="pt-2">
			<v-img
				src="https://www.img.in.th/images/50f1997638d90dd66cf2ce006979990b.jpg"
			></v-img>
		</div>
		<div class="pb-10 mb-5 ma-5">
			<v-container>
				<v-row>
					<v-combobox
						v-model="selectRound"
						:items="round"
						item-text="name"
						label="รอบส่ง"
						outlined
						solo
						@change="addRound"
					></v-combobox>
				</v-row>
			</v-container>

			<div></div>
			<div v-if="islock">
				<v-card>
					<div v-if="checkMessengerRound">
						<v-radio-group v-model="row" row class="mx-2">
							<div @click="notpickUpState">
								<v-radio
									label="ส่งแมสเซนเจอร์"
									value="radio-1"
								></v-radio>
							</div>
							<div @click="pickUpState">
								<v-radio
									label="นัดรับ"
									value="radio-2"
								></v-radio>
							</div>
						</v-radio-group>

						<v-container>
							<v-row>
								<v-combobox
									class="mx-2"
									v-model="selectDropOff"
									:items="pickupAddress"
									item-text="name"
									label="จุดส่ง"
									@change="clickPickup"
								></v-combobox>
							</v-row>
						</v-container>
					</div>
					<div v-if="!isPickUp" class="mx-auto">
						<v-btn to="/address" class="ma-5 px-10">ที่อยู่</v-btn>
						<div class="mx-5">
							<p>
								{{ userAddress.name }} {{ userAddress.contact }}
							</p>
							<p>
								{{ userAddress.address1 }}
								{{ userAddress.district }}
								{{ userAddress.amphoe }}
								{{ userAddress.province }}
								{{ userAddress.zipcode }}
							</p>
						</div>
					</div>
					<div></div>
				</v-card>

				<v-btn @click="modifyCart()" class="pa-auto mt-5"
					>ยอดสรุป</v-btn
				>
			</div>
		</div>

		<div>
			<v-dialog v-model="dialog">
				<v-card>
					<v-card-title class="headline">ต้องการลบ</v-card-title>

					<v-card-text>
						Let Google help apps determine location.
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn
							color="green darken-1"
							text
							@click="dialog = false"
						>
							ยกเลิก
						</v-btn>

						<v-btn
							color="green darken-1"
							text
							@click="clearOrder()"
						>
							ยืนยัน
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-dialog v-model="dialog2">
				<v-card>
					<v-card-title class="headline"
						>เช็คสถานะการจอง</v-card-title
					>

					<v-card-text>
						{{ selectRound.round_id }}
						{{ selectRound.name }}
						{{ islock }}
						<v-btn @click="lockOrder">lock </v-btn>
						<v-btn @click="unlockOrder"> unlock</v-btn>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn
							color="green darken-1"
							text
							@click="dialog2 = false"
						>
							ยกเลิก
						</v-btn>

						<v-btn
							color="green darken-1"
							text
							@click="dialog2 = false"
						>
							ยืนยัน
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import axios from "@/axios";

export default {
	data() {
		return {
			pickup: this.$store.state.pickup,
			bodyformat: "",
			menusList: "",
			cart: "",
			dialog: false,
			dialog2: false,
			isMessenger: true,
			selectRound: this.$store.state.round,
			selectDropOff: this.$store.state.pickupaddress,
			row: "radio-1",
			round: [],
			pickupAddress: [
				{
					id: 1,
					name: "jas srinakarin 10:30-11:00",
				},
				{
					id: 2,
					name: "central bangna 11:30-11:45",
				},
				{
					id: 3,
					name: "ideo q samyan 12:30-13:30",
				},
				{
					id: 4,
					name: "siam (seoulcial club) 13:45-14:30",
				},
			],
			lockOrderStatus: false,
		};
	},
	components: {},
	methods: {
		loginUSER(token) {
			if (this.$store.state.accessToken == "") {
				axios
					.post(this.$store.state.url + "/auth/login", {
						user_id: this.$store.state.profile.userId,
						access_token: token,
					})
					.then((response) => {
						this.$store.commit(
							"SET_ACCESSTOKEN",
							response.data.access_token
						),
							this.getRound(response.data.access_token);
					});
			}
		},
		formatCart() {
			if (this.checkMessengerRound) {
				if (this.pickup) {
					this.bodyformat = {
						[this.selectRound.round_id]: {
							[this.$store.state.menu[0].id]: this.$store.state
								.menu[0].count,
							[this.$store.state.menu[1].id]: this.$store.state
								.menu[1].count,
							[this.$store.state.menu[2].id]: this.$store.state
								.menu[2].count,
							shippingCost: 0,
							note: "-",
							address: {
								dropoff: this.selectDropOff.name,
							},
						},
					};
				} else if (!this.pickup) {
					this.bodyformat = {
						[this.selectRound.round_id]: {
							[this.$store.state.menu[0].id]: this.$store.state
								.menu[0].count,
							[this.$store.state.menu[1].id]: this.$store.state
								.menu[1].count,
							[this.$store.state.menu[2].id]: this.$store.state
								.menu[2].count,
							shippingCost: 0,
							note: "-",
							address: {
								dropoff: this.selectDropOff.name,
								address: this.$store.state.address,
							},
						},
					};
				}
			} else {
				this.bodyformat = {
					[this.selectRound.round_id]: {
						[this.$store.state.menu[0].id]: this.$store.state
							.menu[0].count,
						[this.$store.state.menu[1].id]: this.$store.state
							.menu[1].count,
						[this.$store.state.menu[2].id]: this.$store.state
							.menu[2].count,
						shippingCost: this.bangkokprice(),
						note: "-",
						address: {
							address: this.$store.state.address,
						},
					},
				};
			}

			// eslint-disable-next-line no-console
			console.log(this.bodyformat);
		},
		clearOrder() {
			this.$store.commit("CLEAR_CART");
			this.dialog = false;
		},
		lockOrder() {
			this.lockOrderStatus = true;
			this.$store.commit("changeLockOrderState", true);
		},
		unlockOrder() {
			this.lockOrderStatus = false;
			this.$store.commit("changeLockOrderState", false);
		},
		addRound() {
			// this.$loading.show({ background: "#a68765" });
			this.$store.commit("SET_ROUND", this.selectRound);
			this.lockOrder();
		},
		clickPickup() {
			this.$store.commit("SET_PICKUPADDRESS", this.selectDropOff);
		},
		pickUpState() {
			this.pickup = true;
			this.$store.commit("SET_PICKUP", true);
		},
		notpickUpState() {
			this.pickup = false;
			this.$store.commit("SET_PICKUP", false);
		},
		modifyCart() {
			this.formatCart();
			axios
				.post(
					this.$store.state.url + "/cart",
					JSON.stringify(this.bodyformat),
					{
						headers: {
							Authorization:
								"Bearer " + this.$store.state.accessToken,
							"content-type": "application/json",
						},
					}
				)
				// eslint-disable-next-line no-console
				.then((response) => {
					this.$router.push({ path: "/checkout" }),
					// eslint-disable-next-line no-console
					console.log(response.data);
				})
				.catch((error) => {
					(error) => (this.status = error.response.data.status);
					// eslint-disable-next-line no-console
					console.log(error.response.data);
					// eslint-disable-next-line no-console
					console.log(error.response.status);
					// eslint-disable-next-line no-console
					console.log(error.response.headers);
				});
		},
		getRound(token) {
			axios
				.get(this.$store.state.url + "/round", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				// eslint-disable-next-line no-console
				.then(
					(response) => (
						(this.round = response.data.rounds),
						this.$loading.hide()
					)
				);
		},
		bangkokprice() {
			if (this.checkBangkokLocation) {
				return 75;
			} else {
				return 85;
			}
		},
	},
	computed: {
		userAddress() {
			return this.$store.state.address;
		},
		menus() {
			return this.$store.state.cart;
		},
		islock() {
			return this.$store.state.lockingOrder;
		},
		checkSelectRound() {
			return this.selectRound == "";
		},
		checkBangkokLocation() {
			return this.$store.state.address.province == "กรุงเทพมหานคร";
		},
		checkMessengerRound() {
			return this.selectRound.type == "messenger";
		},
		roundSelected() {
			return this.$store.state.round;
		},
		isPickUp() {
			return this.$store.state.pickup;
		},
	},
	created() {
		// await this.$loading.show({ background: "#a68765" });
		this.loginUSER(this.$store.state.lineaccesstoken);
	},
	mounted() {
		if (!this.round.length) {
			this.getRound(this.$store.state.accessToken);
		}
	},
	// eslint-disable-next-line no-unused-vars
	beforeRouteEnter(to, from, next) {
		// eslint-disable-next-line no-console
		if (from.name == "home") console.log("enter cart");
		next(true);
	},
};
</script>
