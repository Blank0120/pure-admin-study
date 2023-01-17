import Axios, {
	AxiosInstance,
} from "axios";

import { getAsyncRoutes } from "./routes";
import { getLogin, refreshTokenApi } from "./user";

const axiosInstance: AxiosInstance = Axios.create();

export function getAsyncRoutesHook() {
	return getAsyncRoutes(axiosInstance);
}

export function getLoginHook(data) {
	return getLogin(axiosInstance, data);
}

export function refreshTokenApiHokk(data) {
	return getLogin(axiosInstance, data);
}
