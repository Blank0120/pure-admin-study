// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import { setupStore } from "@/store";

// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import './style/tailwind.css';
import { getServerConfig } from './config'

const app = createApp(App)

app
	.use(ElementPlus)
	.use(router)

setupStore(app)

await getServerConfig(app);

app.mount("#app");
