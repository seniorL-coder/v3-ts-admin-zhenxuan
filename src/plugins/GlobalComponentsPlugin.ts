import SvgIcon from '@/components/SvgIcon/index.vue'
import type { App, Plugin } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Category from '../components/Category/index.vue'

const allGlobeComponents: Record<string, any> = {
  SvgIcon,
  Category,
}

const plugin: Plugin = {
  install(app: App) {
    for (const key in allGlobeComponents) {
      app.component(key, allGlobeComponents[key])
    }

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
export default plugin
