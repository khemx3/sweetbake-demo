<template>
	<div>
		<div class="pt-2">
			<v-img
				src="https://www.img.in.th/images/50f1997638d90dd66cf2ce006979990b.jpg"
			></v-img>
		</div>
		<div class="pb-10 mb-5 ma-5">
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
						<tr
							v-for="item in menusList.items[0].orders"
							:key="item.id"
						>
							<td>{{ item.name }}</td>
							<td>{{ item.quantity }}</td>
							<td>{{ item.total }}</td>
						</tr>

						<tr v-if="!checkMessengerRound" class="justify-center">
							<td>ค่าส่ง</td>
							<td></td>
							<td>
								{{ menusList.items[0].shippingCost }}
							</td>
						</tr>
						<tr v-if="!checkMessengerRound" class="justify-center">
							<td>ค่ากล่อง(เพิ่มเติม)</td>
							<td></td>
							<td>{{ menusList.boxes_price }}</td>
						</tr>

						<tr class="justify-center">
							<td>ราคารวม</td>
							<td></td>
							<td>{{ menusList.amount }}</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</div>
		<div>
			<v-row>
				<v-btn color="primary" to="/">แก้ไขรายการ</v-btn>
				<v-btn color="primary" to="/cart">ย้อนกลับ</v-btn>
				<v-btn @click="test" color="primary">ยืนยันการสั่ง</v-btn>
			</v-row>
		</div>
	</div>
</template>

<script>
import axios from "@/axios";

export default {
	data() {
		return {
			menusList: "",
		};
	},
	methods: {
        // eslint-disable-next-line no-console
        test() {console.log(this.$store.state.accessToken)},
		getCart() {
			axios
				.get(
					"https://asia-east2-sweetbake-backend.cloudfunctions.net/api/cart/",
					{
						headers: {
							Authorization:
								"Bearer " + this.$store.state.accessToken ,
						},
					}
				)
				// eslint-disable-next-line no-console
				.then(
					(response) => (
						(this.menusList = response.data),
						// eslint-disable-next-line no-console
						console.log(response.data),
						this.$loading.hide()
					)
				);
		},
		payment() {
			axios.post(
				"https://asia-east2-sweetbake-liff.cloudfunctions.net/checkOutOrder",
				{
					userId: "U6c524d2dbe821532b222ad2e542779b8",
					orderId: "000001",
					price: "199",
				},
				{
					headers: {
                        "content-type": "application/json",
					},
				}
			);
		},
    },
    computed: {
        checkMessengerRound(){
			return this.$store.state.round.type == "messenger";
		}
    },
	created() {
		this.$loading.show({ background: "#a68765" });
		this.getCart();
	},
};
</script>
