import '@/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App, {
  locale: zhCn,
})

app.use(createPinia())
app.use(router)

app.mount('#app')

console.log(import.meta.env)
