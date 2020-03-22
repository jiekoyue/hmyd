import Vue from 'vue'
import VueRouter from 'vue-router'
import routesArr from './childers.js'
// 导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = routesArr

const router = new VueRouter({
  routes,
})
// 前置钩子
router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = to.meta.title
  next()
})
// 后置钩子
router.afterEach((to, from) => {
  NProgress.done()
})
export default router
