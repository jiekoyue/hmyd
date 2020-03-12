import ax from '@/utilis/axioscreate.js'

//获取用户自己的的频道
export function userart (params) {
  return ax({
    url: 'user/channels',
    params,
  })
}

//修改用户自己的的频道
export function useredit (data) {
  return ax({
    url: 'user/channels',
    method: 'post',
    data,
  })
}

//获取相应的频道数据
export function articles (params) {
  return ax({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params
  })
}

//获取全部频道
export function allChan () {
  return ax({
    url: 'channels'
  })
}
