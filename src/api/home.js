import ax from '@/utilis/axioscreate.js'

//获取用户的频道
export function userart () {
  return ax({
    url: 'user/articles',
  })
}

//获取全部频道
export function allChan () {
  return ax({
    url: 'channels'
  })
}
