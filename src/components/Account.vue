<template>
	<div>
		<div class="pt-2">
			<v-img
				src="https://www.img.in.th/images/c7dd9b80e43949d3d261e8e78a203fff.jpg"
			></v-img>
		</div>
		<div>
			<v-container fluid>
				<v-layout column>
					<v-card>
						<v-card-text>
							<v-flex class="mb-4 text-center">
								<v-avatar
									size="96"
									class="justify-center align-center"
								>
									<img :src=this.$store.state.profile.pictureUrl />
								</v-avatar>
							</v-flex>
							<v-text-field
								readonly
								v-model="this.$store.state.profile.displayName"
								label="Line name"
							>
							</v-text-field>
						</v-card-text>
					</v-card>
				</v-layout>
			</v-container>
		</div>
		<div>
			<v-container fluid>
				<v-layout column>
					<v-card>
						<v-card-text>
							<v-card-title>ประวัติการสั่ง</v-card-title>
							<history />
						</v-card-text>
						<v-card-actions> </v-card-actions>
					</v-card>
				</v-layout>
			</v-container>
		</div>
	</div>
</template>

<script>
export default {
	components: {
		history: () => import("./History"),
	},
	data() {
		return {
			loading: false,
			form: {
				firstName: "John",
			},
		};

	},
	computed: {
		userprofile() {
			return this.$store.state.profile;
		},
	},
};
</script>
