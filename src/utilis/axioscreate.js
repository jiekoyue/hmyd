import axios from 'axios'

const ax = axios.create({
  //基地址
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true
})
// 添加请求拦截器
ax.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // config.headers.token = gettoken()
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default ax
