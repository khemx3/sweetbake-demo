<template>
	<v-app id="app">
		<p>{{ profile.userId }}</p>
		<router-view />
		<bottomNav />
	</v-app>
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			profile: {
				userId: "",
				displayName: "",
				pictureUrl: "",
				statusMessage: "",
			},
		};
	},
	components: {
		BottomNav: () => import("./components/BottomNav"),
	},
	beforeCreate() {
		this.$liff
			.init({ liffId: "1654423501-J2xEM1zY" })
			.then(() => {
				this.$liff.ready.then(() => {
					if (!this.$liff.isLoggedIn()) {
						this.$liff.login();
						this.getProfile();
					} else {
						this.getProfile();
					}
				});
			})
			.catch(function(err) {
				// eslint-disable-next-line no-console
				console.log("Error is: " + err);
			});
	},
	mounted() {
		this.getProfile();
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
	},
};
</script>
