<template>
	<div class="pb-10 mb-5 ma-5">
		<div>
			<h1>สรุปรายการขนม</h1>
			<p>{{ orderselected.name }}</p>
			<p>{{ userAddress.address1 }}</p>
		</div>
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
						<tr v-for="item in desserts" :key="item.name">
							<td>{{ item.name }}</td>
							<td>{{ item.quantity }}</td>
							<td>{{ item.price }}</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</div>
		<div>
			<v-row class="align-center">
				<v-col>
					<v-btn color="primary" to="/menu">แก้ไขรายการ</v-btn>
				</v-col>
				<v-col>
					<dir @click="payment()">
						<v-btn color="success">จ่ายเงิน</v-btn>
					</dir>
				</v-col>
			</v-row>
			<v-row>
				<div @click="clearOrder()">
					<v-btn color="normal" to="/">ยกเลิกออเดอร์</v-btn>
				</div>
			</v-row>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			desserts: [
				{
					name: "Frozen Yogurt",
					quantity: 1,
					price: 200,
				},
				{
					name: "Frozen ass",
					quantity: 2,
					price: 200,
				},
			],
		};
	},
	methods: {
		clearOrder: function() {
			this.$store.commit("SET_ORDERCARD", {
				ordercard: {
					id: 0,
					name: "",
					date: "",
					type: "",
				},
			});
		},
		payment: function() {
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
	},
};
</script>
