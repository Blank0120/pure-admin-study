import NProgress from "@/utils/progress";
import {
	Router,
	createRouter,
	createWebHashHistory,
	RouteComponent,
} from "vue-router";

import remainingRouter from "./modules/remaining";

import type { RouteRecordRaw } from "vue-router";
import { sessionKey } from "@/utils/auth";

/** 自动导入全部静态路由，无需再手动引入！匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件，除了 remaining.ts 文件
 * 如何匹配所有文件请看：https://github.com/mrmlnc/fast-glob#basic-syntax
 * 如何排除文件请看：https://cn.vitejs.dev/guide/features.html#negative-patterns
 */
const modules: Record<string, any> = import.meta.glob(
	["./modules/**/*.ts", "!./modules/**/remaining.ts"],
	{
		eager: true
	}
);

/** 原始静态路由（未做任何处理） */
const routes: RouteRecordRaw[] = [];

Object.keys(modules).forEach(key => {
	routes.push(modules[key].default);
});

/** 用于渲染菜单，保持原始层级 */
export const constantMenus: Array<RouteComponent> = (routes as Array<any>).concat(
	...remainingRouter
);

/** 创建路由实例 */
export const router: Router = createRouter({
	history: createWebHashHistory(),
	routes: [...routes, ...remainingRouter]
});

/** 路由白名单 */
const whiteList = ["/login"];

router.beforeEach((to, _from, next) => {
	NProgress.start();
	const userInfo = sessionStorage.getItem(sessionKey);

	if (userInfo || whiteList.indexOf(to.path) !== -1) {
		next();
	} else {
		console.log(`有人试图从${_from.path}未登录访问${to.path}`);
		next({ path: "/login" });
	}
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
