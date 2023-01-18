import { getAsyncRoutesHook } from "@/api";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { router } from "./index";


/** 处理动态路由（后端返回的路由） */
function handleAsyncRoutes(routeList) {
	usePermissionStoreHook().handleWholeMenus(routeList);
}

/** 初始化路由（`new Promise` 写法防止在异步请求中造成无限循环）*/
function initRouter() {
	return new Promise(resolve => {
		getAsyncRoutesHook().then(({ data }) => {
			handleAsyncRoutes(structuredClone(data));
			resolve(router);
		});
	});
};

export {
	initRouter,
};
