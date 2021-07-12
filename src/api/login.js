import request from '@/utils/request'

export const api_login_token = code => {
  return request({
    url: '/api/login/token',
    data: { code },
    custom: { auth: false },
  })
}

export const api_login_profile = (rawData, signature, encryptedData, iv) => {
  return request({
    url: '/api/login/profile',
    data: { rawData, signature, encryptedData, iv },
  })
}

export const api_login_phone = (encryptedData, iv) => {
  return request({
    url: '/api/login/phone',
    data: { encryptedData, iv },
  })
}
