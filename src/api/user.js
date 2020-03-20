import ax from '@/utilis/axioscreate.js'
//获取自己的信息
export function userInfo () {
  return ax({
    url:'user',
  })
}
