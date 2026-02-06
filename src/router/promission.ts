import { useUserStore } from '@/stores/user'
import router from './index'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import Setting from '@/settings.ts'
router.beforeEach((to) => {
  const userStore = useUserStore()

  document.title = `${Setting.title} - ${to.meta.title ?? ''}`
  Nprogress.start()

  if (userStore.token) {
    if (to.path === '/login') {
      return '/'
    }
    return true
  } else {
    if (to.path === '/login') {
      return true
    }
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
})

router.afterEach(() => {
  Nprogress.done()
})
