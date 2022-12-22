export default {
	path: "/error",
	redirect: "/error/404",
	meta: {
		icon: "informationLine",
		title: "异常页面",
		// showLink: false,
		rank: 9
	},
	children: [
		{
			path: "/error/404",
			name: "404",
			component: () => import("@/views/error/404.vue"),
			meta: {
				title: "404"
			}
		},
	]
};
