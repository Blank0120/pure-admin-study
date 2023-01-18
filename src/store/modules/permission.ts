import { defineStore } from "pinia";
import { store } from "@/store";
import { constantMenus } from "@/router";

export const usePermissionStore = defineStore({
  id: "pure-permission",
  state: () => ({
    // 静态路由生成的菜单
    constantMenus,
    // 整体路由生成的菜单（静态、动态）
    wholeMenus: [],
  }),
  actions: {
    /** 组装整体路由生成的菜单 */
    handleWholeMenus(routes: any[]) {
      this.wholeMenus = this.constantMenus.concat(routes);
    },
  }
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
