export const routes = [
  {
    path: '/screen',
    name: 'screen',
    component: () => import('@/views/Screen/index.vue'),
    meta: { title: '数据大屏', hidden: false, Icon: 'gg:screen' }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Layout/index.vue'),
    meta: { title: '数据总览', hidden: false, Icon: 'solar:home-bold' },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
        meta: { title: '首页', hidden: false, Icon: 'solar:home-bold' }
      },
      {
        path:'/jobs',
        name: 'Jobs',
        component: () => import('@/views/Jobs/index.vue'),
        meta: { title: '职位列表', hidden: false, Icon: 'solar:home-bold' }
      },
      {
        path:'/analysis',
        name: 'Analysis',
        component: () => import('@/views/Analysis/index.vue'),
        meta: { title: '数据分析', hidden: false, Icon: 'solar:home-bold' }
      },
      {
        path:'/companies',
        name: 'Companies',
        component: () => import('@/views/Companies/index.vue'),
        meta: { title: '公司信息', hidden: false, Icon: 'solar:home-bold' }
      },
     
      {
        path:'/skills',
        name: 'Skills',
        component: () => import('@/views/Skills/index.vue'),
        meta: { title: '技能词云', hidden: false, Icon: 'solar:home-bold' }
      },
      {
        path:'/trend',
        name: 'Trend',
        component: () => import('@/views/Trend/index.vue'),
        meta: { title: '招聘趋势', hidden: false, Icon: 'solar:home-bold' }
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Layout/index.vue'),
    meta: { title: '后台管理', hidden: false, Icon: 'solar:home-bold' },
    children: [
      {
        path: '/admin/login',
        name: 'Admin',
        component: () => import('@/views/Admin/views/Login/index.vue'),
        meta: { title: '登录', hidden: true, Icon: 'solar:home-bold' }
      },
      {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/Admin/views/Dashboard/index.vue'),
        meta: { title: '控制台', hidden: false, Icon: 'solar:home-bold' }
      },
      {
        path: '/admin/crawler',
        name: 'AdminCrawler',
        component: () => import('@/views/Admin/views/Crawler/index.vue'),
        meta: { title: '爬虫管理', hidden: false, Icon: 'solar:home-bold' }
      },
      {
        path: '/admin/data',
        name: 'AdminData',
        component: () => import('@/views/Admin/views/Data/index.vue'),
        meta: { title: '数据管理', hidden: false, Icon: 'solar:home-bold' }
      },
      {
        path: '/admin/user',
        name: 'AdminUser',
        component: () => import('@/views/Admin/views/User/index.vue'),
        meta: { title: '用户管理', hidden: false, Icon: 'solar:home-bold' }
      }
    ]
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: { title: '404', hidden: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: { title: 'pattern', hidden: true }
  }
]
