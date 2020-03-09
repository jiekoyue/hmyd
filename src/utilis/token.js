let value = 'hmtt'

//获取token
export function getToken () {
  return JSON.parse(window.localStorage.getItem(value))
}

//设置token
export function setToken (val) {
  window.localStorage.setItem(value, JSON.stringify(val))
}

//删除token
export function removeToken () {
  window.localStorage.removeItem(value)
}
