import { AxiosRequestConfig } from "axios";

export type UserResult = {
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

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 登录 */
export const getLogin = (
  axiosInstance,
  param?: AxiosRequestConfig,
) => new Promise<UserResult>((resolve, reject) => {
  axiosInstance.post("/login", {...param}).then((response) => {
    resolve(response.data as UserResult)
  }).catch((error) => {
    reject(error)
  })
});

/** 刷新token */
export const refreshTokenApi = (axiosInstance, data?: object) => {
  return axiosInstance.post("/refreshToken", { data });
};
