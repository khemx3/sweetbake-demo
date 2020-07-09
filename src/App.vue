<template>
	<v-app id="app">
		<router-view />
		<bottomNav />
	</v-app>
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			
		};
	},
	components: {
		BottomNav: () => import("./components/BottomNav"),
	},
	methods: {
	},
};
</script>
