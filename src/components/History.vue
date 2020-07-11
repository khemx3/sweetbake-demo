<template>
	<div>
		<div>
			<v-simple-table>
				<template v-slot:default>
					<thead>
						<tr>
							<th class="text-left ">หมายเลขออเดอร์</th>
							<th class="text-left">สถานะการจ่ายเงิน</th>
							<th class="text-left">รายละเอียด</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in history" :key="item.name">
							<td>#{{ item.name }}</td>
							
							<td>
								<v-chip
									:class="colorClass(item.state)"
									text-color="white"
								>
									{{ item.state }}
								</v-chip>
							</td>
							<td>
								<v-btn small @click.stop="dialog = true"
									>กดเพื่อดู</v-btn
								>
							</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</div>
		<div>
			<v-dialog v-model="dialog" >
				<v-card>
					<v-card-title class="headline"
						>Use Google's location service?</v-card-title
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
							Disagree
						</v-btn>

						<v-btn
							color="green darken-1"
							text
							@click="dialog = false"
						>
							Agree
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		dialog: false,
		history: [
			{
				name: "0000001",
				state: "pending",
			},
			{
				name: "0000002",
				state: "success",
			},
		],
	}),
	methods: {
		colorClass(item) {
			let color = item === "success" ? "green" : "";

			return "color: " + color;
		},
	},
};
</script>
