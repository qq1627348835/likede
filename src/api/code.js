import request from '@/utils/request'

export function code(clientToken) {
  return request(
    {
      url: `/user-service/user/imageCode/${clientToken}`,
      responseType: 'blob'
    }
  )
}
