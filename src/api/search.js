import ax from '@/utilis/axioscreate.js'

//搜索联想
export function assword (params) {
  return ax({
    url: 'suggestion',
    params
  })
}

//历史记录
export function histories () {
  return ax({
    url: 'search/histories'
  })
}

//删除历史记录
export function hisdel () {
  return ax({
    url: 'search/histories',
    method: 'delete'
  })
}
