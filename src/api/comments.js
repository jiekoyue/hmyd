import ax from '@/utilis/axioscreate.js'

//获取评论
export function comments (params) {
  return ax({
    url: 'comments',
    params
  })
}

//评论点赞
export function plLike (data) {
  return ax({
    url: 'comment/likings',
    method: 'post',
    data
  })
}

//取消评论点赞
export function plUnlike (data) {
  return ax({
    url: 'comment/likings/' + data,
    method: 'delete',
  })
}

//添加评论
export function plAdd (data) {
  return ax({
    url: 'comments',
    method: 'post',
    data
  })
}
