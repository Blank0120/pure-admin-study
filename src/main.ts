// main.ts
import { createApp, h } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import App from './App.vue'

const app = createApp(h("div", null, "Content"))

app.use(ElementPlus)
app.mount('#app')
