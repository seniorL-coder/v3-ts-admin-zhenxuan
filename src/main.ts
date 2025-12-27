import '@/assets/main.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import 'virtual:svg-icons-register' // svg 图标注册
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import GlobalComponentsPlugin from '@/plugins/GlobalComponentsPlugin.ts'

import '@/router/promission'
import pinia from './stores'
const app = createApp(App, {
  locale: zhCn,
})

app.use(pinia)
app.use(router)
app.use(GlobalComponentsPlugin)

app.mount('#app')
