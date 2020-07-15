<template>
	<div :style="myStyle">
		<div class="pt-2">
			<v-img
				src="https://www.img.in.th/images/e885984d07530fe69ca7f954aa62a079.jpg"
			></v-img>
		</div>

		<ordercard class="justify-center" />
	</div>
</template>

<script>
import axios from "@/axios";
export default {
	data() {
		return {
			profile: {
				userId: "",
				displayName: "",
				pictureUrl: "",
				statusMessage: "",
			},
			myStyle: {
				backgroundColor: "#C9BC9C",
			},
		};
	},
	components: {
		ordercard: () => import("./ordercard"),
	},
	beforeCreate() {
		// this.$liff
		// 	.init({ liffId: "1654423501-J2xEM1zY" })
		// 	.then(() => {
		// 		this.$liff.ready.then(() => {
		// 			if (!this.$liff.isLoggedIn()) {
		// 				this.$liff.login();
		// 				this.getProfile();
		// 			} else {
		// 				this.getProfile();
		// 			}
		// 		});
		// 	})
		// 	.catch(function(err) {
		// 		// eslint-disable-next-line no-console
		// 		console.log("Error is: " + err);
		// 	});
	},
	methods: {
		getProfile() {
			let _this = this;
			this.$liff
				.getProfile()
				.then(function(profile) {
					_this.profile = profile;
				})
				.catch(function(error) {
					alert("Error getting profile: " + error);
				});
		},
		updateCart() {},
		login() {
			if (this.$store.state.accessToken == "") {
				axios
					.post(this.$store.state.url +"/auth/login",
						{
							user_id: "U6c524d2dbe821532b222ad2e542779b8",
							access_token:
								"eyJhbGciOiJIUzI1NiJ9.GCtBASugBRNRQF2nMhRse7cF788MMouzEl0FkKzM1CiEYRW-j4B1HTnfFwR7qwBHtB3wLy8lokkpMBnYdbw9x36kwQ-wFHokrbxE_gpuFMWXD43qU4HrDw7DZ4TFs9I4.rUuTzZ_nEWOHhf74tkfaJ6-zPvSBjjvwacG7DJ9NpiA",
						},
						{
							headers: {
								"content-type": "application/json",
							},
						}
					)
					.then((response) =>
						this.$store.commit(
							"SET_ACCESSTOKEN",
							response.data.access_token
						)
					);
				// eslint-disable-next-line no-console
				console.log("request token")
			}
			
		},
	},
	updated() {
		this.$store.commit("SET_LINEUSER", this.profile);
	},
	mounted() {
		this.login();
	},
	// eslint-disable-next-line no-unused-vars
	beforeRouteLeave(to, from, next) {
		// eslint-disable-next-line no-console
		if (to.name == "cart") {
			this.updateCart();
			// eslint-disable-next-line no-console
		}
		next(true);
	},
};
</script>
