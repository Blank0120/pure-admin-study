import { defineStore } from "pinia";
import { store } from "@/store";

import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

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

const getLogin = (
  method: RequestMethods,
  url: string,
  param?: AxiosRequestConfig,
) => new Promise<UserResult>((resolve, reject) => {
  axiosInstance.request({
    method,
    url,
    ...param
  }).then((response) => {
    resolve(response.data as UserResult)
  }).catch((error) => {
    reject(error)
  })
});

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
        getLogin("post", "/login", { data })
          .then(data => {
            if (data) {
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
