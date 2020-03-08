import ax from '@/utilis/axioscreate.js'

export function mobile (mobile) {
  return ax({
    url: ' /app/v1_0/sms/codes/:mobile',
    params: {
      mobile
    }
  })
}
