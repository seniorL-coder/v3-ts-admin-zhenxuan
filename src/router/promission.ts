import { useUserStore } from '@/stores/user'
import router from './index'

import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import Setting from '@/settings.ts'
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  document.title = `${Setting.title} - ${to.meta.title}`
  Nprogress.start()
  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    }
  }
})

router.afterEach(() => {
  Nprogress.done()
})
