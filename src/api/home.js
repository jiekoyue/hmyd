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
    method: 'put',
    data,
  })
}

//修改用户自己的的频道
export function userdel (data) {
  return ax({
    url: 'user/channels',
    method: 'delete',
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

//文章详情
export function articlesInfo (params) {
  return ax({
    url: `articles/${params}`,
  })
}

//关注用户
export function followings (data) {
  return ax({
    url: 'user/followings',
    method: 'post',
    data
  })
}

//关注用户
export function collect (data) {
  return ax({
    url: 'article/collections',
    method: 'post',
    data
  })
}

//取消关注用户
export function unfollow (data) {
  return ax({
    url: 'user/followings/' + data,
    method: 'delete',
  })
}

//取消收藏
export function uncollect (data) {
  return ax({
    url: 'article/collections/' + data,
    method: 'delete',
  })
}

//对文章不喜欢
export function artdislikes (data) {
  return ax({
    url: 'article/dislikes',
    method: 'post',
    data
  })
}

//取消对文章不喜欢
export function unartdislikes (data) {
  return ax({
    url: 'article/dislikes/' + data,
    method: 'delete',
  })
}

//对文章点赞
export function artlikes (data) {
  return ax({
    url: 'article/likings',
    method: 'post',
    data
  })
}

//取消对文章点赞
export function unartlikes (data) {
  return ax({
    url: 'article/likings/' + data,
    method: 'delete',
  })
}

//拉黑用户
export function userUnlike (data) {
  return ax({
    url: 'user/blacklists',
    method: 'post',
    data
  })
}

//举报文章
export function artReports (data) {
  return ax({
    url: 'article/reports',
    method: 'post',
    data
  })
}
