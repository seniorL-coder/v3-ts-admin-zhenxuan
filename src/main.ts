import '@/assets/main.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import 'virtual:svg-icons-register' // svg 图标注册
import GlobalComponentsPlugin from '@/plugins/GlobalComponentsPlugin.ts'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
import { initTheme } from '@/initTheme.ts'
import '@/router/promission'
import pinia from './stores'
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(GlobalComponentsPlugin)

app.mount('#app')
initTheme()
