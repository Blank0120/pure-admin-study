import { getAsyncRoutesHook } from "@/api";
import { usePermissionStoreHook } from "@/store/modules/permission";
import type { RouteRecordRaw } from "vue-router";
import { router } from "./index";


/** 处理动态路由（后端返回的路由） */
function handleAsyncRoutes(routeList) {
	usePermissionStoreHook().handleWholeMenus(routeList);
}

/** 初始化路由（`new Promise` 写法防止在异步请求中造成无限循环）*/
function initRouter() {
	return new Promise(resolve => {
		getAsyncRoutesHook().then(({ data }) => {
			handleAsyncRoutes(structuredClone(data.data));
			resolve(router);
		});
	});
};

/** 按照路由中meta下的rank等级升序来排序路由 */
function ascending(arr: any[]) {
	return arr.sort(
		(a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
			return a?.meta.rank - b?.meta.rank;
		}
	);
}

/**
 * 将多级嵌套路由处理成一维数组
 * @param routesList 传入路由
 * @returns 返回处理后的一维路由
 */
function formatFlatteningRoutes(routesList: RouteRecordRaw[]) {
	if (routesList.length === 0) return routesList;
	for (let i = 0; i < routesList.length; i++) {
		if (routesList[i].children) {
			routesList = routesList
				.slice(0, i + 1)
				.concat(routesList[i].children, routesList.slice(i + 1));
		}
	}
	return routesList;
}

/**
 * 一维数组处理成多级嵌套数组（三级及以上的路由全部拍成二级，keep-alive 只支持到二级缓存）
 * https://github.com/xiaoxian521/vue-pure-admin/issues/67
 * @param routesList 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成规定路由的格式
 */
function formatTwoStageRoutes(routesList: RouteRecordRaw[]) {
	if (routesList.length === 0) return routesList;
	const newRoutesList: RouteRecordRaw[] = [];
	routesList.forEach((v: RouteRecordRaw) => {
		if (v.path === "/") {
			newRoutesList.push({
				component: v.component,
				name: v.name,
				path: v.path,
				redirect: v.redirect,
				meta: v.meta,
				children: []
			});
		} else {
			newRoutesList[0]?.children.push({ ...v });
		}
	});
	return newRoutesList;
}

/**
 * @description 创建层级关系
 * @param tree 树
 * @param pathList 每一项的id组成的数组
 * @returns 创建层级关系后的树
 */
 export const buildHierarchyTree = (tree: any[], pathList = []): any => {
	if (!Array.isArray(tree)) {
	  console.warn("tree must be an array");
	  return [];
	}
	if (!tree || tree.length === 0) return [];
	for (const [key, node] of tree.entries()) {
	  node.id = key;
	  node.parentId = pathList.length ? pathList[pathList.length - 1] : null;
	  node.pathList = [...pathList, node.id];
	  const hasChildren = node.children && node.children.length > 0;
	  if (hasChildren) {
		buildHierarchyTree(node.children, node.pathList);
	  }
	}
	return tree;
  };

export {
	initRouter,
	// TODO understanding
	ascending,
	formatFlatteningRoutes,
	formatTwoStageRoutes,
	// END TODO
};
