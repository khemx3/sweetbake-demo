<template>
	<div>
		<div class="pt-2">
			<v-img
				src="https://www.img.in.th/images/50f1997638d90dd66cf2ce006979990b.jpg"
			></v-img>
		</div>
		<div class="pb-10 mb-5 ma-5">
			<div>
				<v-simple-table>
					<template v-slot:default>
						<thead>
							<tr>
								<th class="text-left">รายการ</th>
								<th class="text-left">จำนวน</th>
								<th class="text-left">ราคา</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in menus" :key="item.id">
								<td>{{ item.name }}</td>
								<td>{{ item.count }}</td>
								<td>-</td>
							</tr>
							<tr class="justify-center">
								<td>ค่าขนมรวม(ไม่รวมค่าส่ง)</td>
								<td></td>
								<td>-</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</div>
			<div>
				<v-col>
					<v-btn color="primary" to="/">แก้ไขรายการ</v-btn>

					<v-btn @click="dialog = true" color="normal"
						>ล้างรายการ</v-btn
					>
				</v-col>
			</div>
			<div>
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
					<v-btn
						:disabled="checkSelectRound"
						@click="dialog2 = true"
						color="normal"
						>จองรอบ</v-btn
					>
				</v-container>
			</div>
			<div v-if="islock">
				<v-card>
					<div v-if="checkMessengerRound">
						<v-radio-group v-model="row" row>
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
									v-model="selectDropOff"
									:items="pickup"
									item-text="name"
									label="จุดส่ง"
								></v-combobox>
							</v-row>
						</v-container>
					</div>
					<div v-if="!isPickUp" class="mx-auto pt-5">
						<v-btn to="/address">ที่อยู่</v-btn>
						<p>{{ userAddress.name }} {{ userAddress.contact }}</p>
						<p>
							{{ userAddress.address1 }}
							{{ userAddress.district }} {{ userAddress.amphoe }}
							{{ userAddress.province }}
							{{ userAddress.zipcode }}
						</p>
						<div v-if="checkBangkokLocation">Bangkok send</div>
					</div>
					<div></div>
				</v-card>
				<v-btn>จ่ายเงิน</v-btn>
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
import axios from '@/axios';

export default {
	data() {
		return {
			cart: "",
			dialog: false,
			dialog2: false,
			isMessenger: true,
			selectRound: this.$store.state.round,
			selectDropOff: "",
			row: "radio-1",
			round: [
				{ name: "kerry 1/1/1", id: 1, type: "kerry" },
				{ name: "messager 2/2/2", id: 2, type: "messenger" },
			],
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
			lockOrderStatus: this.$store.state.lockOrder,
		};
	},
	components: {},
	methods: {
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
			this.$store.commit("SET_ROUND", this.selectRound);
			// eslint-disable-next-line no-console
			console.log(this.selectRound);
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
		getCart() {
			axios.get(axios.baseURL, {
			// eslint-disable-next-line no-unused-vars
			} ).then((response) => {
				this.$loading.hide()
				// eslint-disable-next-line no-console
				console.log(response)
			}, (error) => {
				// eslint-disable-next-line no-console
				console.log(error);
			});
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
	mounted() {
		this.getCart()
	},
	// eslint-disable-next-line no-unused-vars
	beforeRouteEnter (to, from, next) {
	// eslint-disable-next-line no-console
	if(from.name == 'home') console.log("enter cart")
	next(true)
	},
};
</script>
