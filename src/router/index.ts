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
import { usePermissionStoreHook } from "@/store/modules/permission";
import { ascending, buildHierarchyTree, formatFlatteningRoutes, formatTwoStageRoutes, initRouter } from "./utils";

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

/** 导出处理后的静态路由（三级及以上的路由全部拍成二级） */
export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
	formatFlatteningRoutes(buildHierarchyTree(ascending(routes)))
);

/** 用于渲染菜单，保持原始层级 */
export const constantMenus: Array<RouteComponent> = (routes as Array<any>).concat(
	...remainingRouter
);

/** 创建路由实例 */
export const router: Router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes.concat(...remainingRouter)
});

/** 路由白名单 */
const whiteList = ["/login"];

router.beforeEach((to, _from, next) => {
	NProgress.start();
	if (whiteList.indexOf(to.path) !== -1) {
		next();
	}

	const userInfo = sessionStorage.getItem(sessionKey);

	if (userInfo) {
		// 刷新
		if (
			usePermissionStoreHook().wholeMenus.length === 0 &&
			to.path !== "/login"
		) {
			initRouter();
		}
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
