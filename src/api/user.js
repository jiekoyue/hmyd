import ax from '@/utilis/axioscreate.js'

//获取自己的信息
export function userInfo () {
  return ax({
    url: 'user',
  })
}

//获取用户个人资料
export function userProfile () {
  return ax({
    url: 'user/profile',
  })
}
