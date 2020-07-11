<template>
	<v-app id="app" :style="myStyle">
		<router-view />
		<bottomNav />
	</v-app>
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			myStyle: {
				backgroundColor: "#C9BC9C",
			},
		};
	},
	components: {
		BottomNav: () => import("./components/BottomNav"),
	},
	methods: {
	},
};
</script>
