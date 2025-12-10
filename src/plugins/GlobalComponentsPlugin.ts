import SvgIcon from '@/components/SvgIcon/index.vue'
import type { App, Plugin } from 'vue'

const allGlobeComponents: Record<string, any> = {
  SvgIcon,
}

const plugin: Plugin = {
  install(app: App) {
    for (const key in allGlobeComponents) {
      app.component(key, allGlobeComponents[key])
    }
  },
}
export default plugin
