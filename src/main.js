import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './style/base.css'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import judge from '@/utilis/judgeToken.js'

Vue.prototype.$judegefn = judge.judgefn
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.use(Vant)
Vue.config.productionTip = false
Vue.filter('converTime', function (data) {
  return dayjs().from(data)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
