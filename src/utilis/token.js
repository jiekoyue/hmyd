let value = 'hmtt'
let history = 'hisarr'

//获取token
export function getToken () {
  return JSON.parse(window.localStorage.getItem(value))
}

//获取token
export function getChe (val) {
  return JSON.parse(window.localStorage.getItem(val))
}

//设置token
export function setToken (val) {
  window.localStorage.setItem(value, JSON.stringify(val))
}

//设置token
export function setChe (val, item) {
  window.localStorage.setItem(val, JSON.stringify(item))
}

//删除token
export function removeToken () {
  window.localStorage.removeItem(value)
}

//设置搜索的历史记录
export function setHis (val) {
  window.localStorage.setItem(history, JSON.stringify(val))
}

//获取历史记录
export function getHis () {
  return JSON.parse(window.localStorage.getItem(history))
}

//删除历史记录
export function removeHis () {
  window.localStorage.removeItem(history)
}
