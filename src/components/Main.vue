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
		updateCart() {
			
		},
	},
	updated() {
		this.$store.commit("SET_LINEUSER", this.profile);
	},
	mounted() {},
	// eslint-disable-next-line no-unused-vars
	beforeRouteLeave(to, from, next) {
		// eslint-disable-next-line no-console
		if (to.name == "cart") {
			this.updateCart();
		}
		next(true);
	},
};
</script>
