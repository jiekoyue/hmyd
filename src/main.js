import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './style/base.css'
import moment from 'moment'

Vue.use(Vant)
Vue.config.productionTip = false
Vue.filter('converTime', function (data) {
  moment.locale()
  return moment(data, 'YYYYMMDD').fromNow('LLL')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
