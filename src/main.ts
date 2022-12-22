// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'

const app = createApp(App)

import { createRouter, createWebHashHistory } from "vue-router";
import r from "@/router";

app
.use(ElementPlus)
.use(createRouter({history: createWebHashHistory(), routes: r.children}))
app.mount('#app')
