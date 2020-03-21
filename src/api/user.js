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

//编辑用户照片资料（头像、身份证照片）
export function userPhoto (data) {
  window.console.log(1)
  let fd = new FormData()
  fd.append('photo', data.photo)
  return ax({
    url: 'user/photo',
    method: 'patch',
    data: fd
  })
}

//编辑用户个人资料（包含实名认证）
export function userPro (data) {
  return ax({
    url: 'user/profile',
    method: 'patch',
    data
  })
}
