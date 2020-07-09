<template>
	<div>
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
									<img src="" />
								</v-avatar>
							</v-flex>
							<v-text-field
								readonly
								v-model="form.firstName"
								label="Line name"
							>
							</v-text-field>

							<v-col class="ma-0 pa-0">
								<v-text-field
									:value="addresstext"
									label="ที่อยู่"
									readonly
								></v-text-field>
							</v-col>
						</v-card-text>
						<v-card-actions>
							<v-btn to="/address" color="primary">
								แก้ไขที่อยู่
							</v-btn>
						</v-card-actions>
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
							<history/>
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
      history: () => import('./History'),
    },
	data() {
		return {
			loading: false,
			form: {
				firstName: "John",
			},
			showAvatarPicker: false,
			addresstext: "",
		};
    },
    methods: {
        getAddressInfo() {
            this.addresstext =
            this.userAddress.address1 + " " + 
            this.userAddress.district + " " + 
            this.userAddress.amphoe + " " + 
            this.userAddress.province + " " + 
            this.userAddress.zipcode;
        }
    },
    computed: {
        userprofile() {
			return this.$store.state.profile;
		},
		userAddress() {
			return this.$store.state.address;
		},
	},
</script>
