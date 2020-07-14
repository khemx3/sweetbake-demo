<template>
	<div :style="myStyle">
		<div class="pt-2">
			<v-img
				src="https://www.img.in.th/images/e885984d07530fe69ca7f954aa62a079.jpg"
			></v-img>
		</div>
		<p class="text--disabled">{{ profile.userId }}</p>
		<ordercard class="justify-center" />
	</div>
</template>

<script>
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
			access: "",
		};
	},
	components: {
		ordercard: () => import("./ordercard"),
	},
	beforeCreate() {
		this.$liff
			.init({ liffId: "1654423501-J2xEM1zY" })
			.then(() => {
				this.$liff.ready.then(() => {
					if (!this.$liff.isLoggedIn()) {
						this.$liff.login();
						this.getProfile();
						this.getAccessToken();
					} else {
						this.getProfile();
						this.getAccessToken();
					}
				});
			})
			.catch(function(err) {
				// eslint-disable-next-line no-console
				console.log("Error is: " + err);
			});
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
		getAccessToken() {
			this.access = this.$liff.getAccessToken();
			// eslint-disable-next-line no-console
			console.log(this.access);
		},
	},
	updated() {
		
		this.$store.commit("SET_LINEUSER", this.profile);
	},
	mounted() {

	},
};
</script>
