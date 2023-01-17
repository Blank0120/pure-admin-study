import { defineStore } from "pinia";
import { store } from "@/store";

import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { removeToken, setToken } from "@/utils/auth";
import router from "@/router";
import { getLoginHook } from "@/api";

type RequestMethods = "get" | "delete" | "head" | "post" | "put" | "patch";

type UserResult = {
  success: boolean;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

type userType = {
  username?: string;
  roles?: Array<string>;
}

const axiosInstance: AxiosInstance = Axios.create();

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 用户名
    username:"",
    // 页面级别权限
    roles: []
  }),
  actions: {
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 登入 */
    async loginByUsername(data: any) {
      return new Promise<UserResult>((resolve, reject) => {
        getLoginHook({data})
          .then(data => {
            if (data) {
              setToken(data.data);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      removeToken();
      router.push("/login");
    },
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
