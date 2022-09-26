import request from '@/utils/request'

export function loginAPI(data) {
  return request(
    {
      url: '/user-service/user/login',
      method: 'post',
      data
    }
  )
}
