<template>
	<div class="pb-10 mb-5 ma-5">
		<div>
			<v-img
				src="https://www.img.in.th/images/50f1997638d90dd66cf2ce006979990b.jpg"
			></v-img>
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
								<td> - </td>
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
				<v-row class="align-center">
					<v-col>
						<v-btn color="primary" to="/">แก้ไขรายการ</v-btn>
					</v-col>
					<v-col>
						<dir @click="payment()">
							<v-btn color="success">เลือกรอบ</v-btn>
						</dir>
					</v-col>
				</v-row>
				<v-row>
					<div @click="dialog = true">
						<v-btn color="normal">ยกเลิกออเดอร์</v-btn>
					</div>
				</v-row>
			</div>
		</div>
		<div>
			<v-dialog v-model="dialog">
				<v-card>
					<v-card-title class="headline"
						>ต้องการลบ</v-card-title
					>

					<v-card-text>
						Let Google help apps determine location. This means
						sending anonymous location data to Google, even when no
						apps are running.
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
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dialog: false
		}
	},
	methods: {
		clearOrder() {
			this.$store.commit("CLEAR_CART");
			this.dialog = false
		},
		payment() {
			this.$liff
				.sendMessages([
					{
						type: "bubble",
						body: {
							type: "box",
							layout: "vertical",
							contents: [
								{
									type: "text",
									text: "ชำระด้วยการโอน",
									weight: "bold",
									size: "xl",
									margin: "none",
								},
								{
									type: "separator",
									margin: "none",
								},
								{
									type: "text",
									text: "Order Number",
									color: "#aaaaaa",
								},
								{
									type: "text",
									text: "#{{orderNumber}}",
									weight: "bold",
								},
								{
									type: "text",
									text: "฿{{price}}",
									size: "xl",
									color: "#1CD053",
									weight: "bold",
									align: "start",
								},
								{
									type: "image",
									url:
										"https://www.img.in.th/images/3ca436d3d7cd360282e016e8150ab050.png",
									align: "start",
									size: "sm",
								},
								{
									type: "spacer",
								},
							],
							spacing: "sm",
						},
					},
				])
				.then(() => {
					this.$liff.closeWindow();
				});
		},
	},
	computed: {
		orderselected() {
			return this.$store.state.ordercard;
		},
		userAddress() {
			return this.$store.state.address;
		},
		menus() {
			return this.$store.state.cart;
		},
	},
};
</script>
