import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "home",
      component: () => import("./components/Main"),
		},
		{
			path: "/cart",
			name: "cart",
			component: () => import("./components/Cart"),
		},
		{
			path: "/account",
			name: "account",
			component: () => import("./components/Account"),
		},
		{
			path: "/address",
			name: "address",
			component: () => import("./components/Address"),
		},
		{
			path: "/checkout",
			name: "checkout",
			component: () => import("./components/Checkout"),
		},
		{
			path: "/upload/:orderId",
			component: () => import("./components/upload"),
		},
	],
});


export default router;
