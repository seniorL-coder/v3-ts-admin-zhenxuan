import '@/assets/main.css'
import '@/styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue'
import router from './router'

import 'virtual:svg-icons-register' // svg 图标注册
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import GlobalComponentsPlugin from '@/plugins/GlobalComponentsPlugin.ts'

const app = createApp(App, {
  locale: zhCn,
})

app.use(createPinia())
app.use(router)
app.use(MotionPlugin)
app.use(GlobalComponentsPlugin)

app.mount('#app')
