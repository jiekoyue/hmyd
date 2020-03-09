import ax from '@/utilis/axioscreate.js'

//获取用户自己的的频道
export function userart () {
  return ax({
    url: 'user/channels',
  })
}

//获取全部频道
export function allChan () {
  return ax({
    url: 'channels'
  })
}
