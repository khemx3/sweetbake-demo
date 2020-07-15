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
									:items="pickup"
									item-text="name"
									label="จุดส่ง"
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
				<div @click="formatCart">
					<v-btn to="/checkout" class="pa-auto mt-5">ยอดสรุป</v-btn>
				</div>
				
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
						{{ selectRound.id }}
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
			bodyformat: "",
			menusList: "",
			cart: "",
			dialog: false,
			dialog2: false,
			isMessenger: true,
			selectRound: this.$store.state.round,
			selectDropOff: "",
			row: "radio-1",
			round: [],
			pickup: [
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
		formatCart(){
			this.bodyformat = {
				"32tqos7of" :{  
					[this.$store.state.menu[0].id]: this.$store.state.menu[0].count,  
					[this.$store.state.menu[1].id]: this.$store.state.menu[1].count,
					[this.$store.state.menu[2].id]: this.$store.state.menu[2].count,
					"shippingCost": this.bangkokprice(),
					"note": "-",
					"address": this.$store.state.address
				}
			}
			this.modifyCart()
			// eslint-disable-next-line no-console
			console.log(JSON.stringify(this.bodyformat))
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
		pickUpState() {
			// eslint-disable-next-line no-console
			console.log("pickup");
			this.$store.commit("SET_PICKUP", true);
		},
		notpickUpState() {
			// eslint-disable-next-line no-console
			console.log("not pickup");
			this.$store.commit("SET_PICKUP", false);
		},
		modifyCart() {
			axios.post(
				this.$store.state.url + "/cart",
				JSON.stringify(this.formatCart),
				{
						headers: {
							Authorization:
								"Bearer " + this.$store.state.accessToken ,
							"content-type": "application/json",
						},
					}	
			)
		},
		getRound() {	
				axios
				.get(this.$store.state.url +"/round",
					{
						headers: {
							Authorization:
								"Bearer " + this.$store.state.accessToken,
						},
					}
				)
				// eslint-disable-next-line no-console
				.then(
					(response) => (
						(this.round = response.data.rounds),
						this.$loading.hide()
					)
				);
			
			
		},
		bangkokprice() {
			if(this.checkBangkokLocation) {
				return 75
			} else {
				return 85
			}
		}
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
		this.$loading.show({ background: "#a68765" });
		this.getRound();
	},
	// eslint-disable-next-line no-unused-vars
	beforeRouteEnter(to, from, next) {
		// eslint-disable-next-line no-console
		if (from.name == "home") console.log("enter cart");
		next(true);
	},
};
</script>
