import login from '@/views/login/index.vue'
import index from '@/views/home/index.vue'

export default [
  {
    path: '/login',
    component: login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/index',
    component: index,
    meta: {
      title: '首页'
    }
  },
]
