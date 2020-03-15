import axios from 'axios'
import store from '@/store/index.js'
import JSONint from 'json-bigint'

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
  config.headers.Authorization = `Bearer ${store.state && store.state.token}`
  config.headers.trace = store.state.trace
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
ax.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default ax
