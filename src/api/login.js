import ax from '@/utilis/axioscreate.js'

export function mobile (mobile) {
  return ax({
    url: ' sms/codes/:mobile',
    params: {
      mobile
    }
  })
}

export function login (data) {
  return ax({
    url: 'authorizations',
    method: 'post',
    data
  })
}
