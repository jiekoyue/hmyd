import axios from 'axios'
import store from '@/store/index.js'
import JSONint from 'json-bigint'
import { setToken } from '@/utilis/token.js'

const ax = axios.create({
  //基地址
  baseURL: process.env.VUE_APP_URL,
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return JSONint.parse(data)
  }],
})
// 添加请求拦截器
ax.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.state.token) {
    config.headers.Authorization = `Bearer ${store.state.token}`
  }


  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
ax.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, async function (error) {
  // 对响应错误做点什么
  if (error.response.status == 401) {
    let msg = await axios({
      url: process.env.VUE_APP_URL + 'authorizations',
      method: 'put',
      headers: {
        Authorization: 'Bearer ' + store.state.refresh_token
      }
    })
    store.commit('setTokenfn', msg.data.data.token)
    setToken({
      token: msg.data.data.token,
      refresh_token: store.state.refresh_token,
    })
    let res = await ax(error.config)
    return res
  } else {
    return Promise.reject(error)
  }

})
export default ax
