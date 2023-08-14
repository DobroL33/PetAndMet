import { domain } from 'hooks/customQueryClient'
import axios from 'axios'

//Axios baseUrl 설정
export const customAxios = axios.create({
  baseURL: `${domain}`,
})

export async function refreshToken(accessToken: string) {
  try {
    const response = await axios.request({
      url: `${domain}/user/refresh`,
      method: 'post',
      headers: {
        Authorization: `${accessToken}`,
      },
    })
    const token = response.data.response
    return token
  } catch (error) {
    return error
  }
}

customAxios.interceptors.request.use(async config => {
  console.log('axios 헤더', config)
  return config
})

customAxios.interceptors.response.use(
  response => {
    console.log('성공')
    return response
  },
  async error => {
    if (axios.isCancel(error)) {
      console.log('취소', error)
    } else if (error.response) {
      if (error.response.status === 403) {
        console.log('403에러 발생')
        // Refresh토큰은 살아있는데 Access토큰이 죽은 경우
        if (error.response.data.detail === 'Access') {
          console.log('Refrech 살아있음')
          const originRequest = error.config
          //   if (error.config.headers.Authorization) {
          //     console.log('요청보냄', error.config.headers.Authorization)
          //   }
          console.log(error)
          const newToken = await refreshToken(
            error.config.headers.Authorization
          )
          if (newToken !== '토큰 정보가 유효하지 않습니다.') {
            //   console.log('오리진', originRequest.headers.Authorization)
            //   console.log('API', customAxios.defaults.headers.common.Authorization)
            customAxios.defaults.headers.common.Authorization = `Bearer ${newToken}`
            originRequest.headers.Authorization = `Bearer ${newToken}`
            console.log('바뀐 token', newToken)
            return customAxios(originRequest)
          }
          //Refresg토큰이 죽어서 로그인 창으로 보내야 하는 경우
        } else if (error.response.data.detail === 'Refresh') {
          console.log('Refrech 죽음')
          //   console.log('요청실패', error.config.headers.Authorization)
          //   console.log('API', customAxios.defaults.headers.common.Authorization)
          alert('로그인을 다시 해주세요')
          window.location.href = '/login'
          // return 'Refresh'
        } else {
          console.log(error.response.data)
        }
      }
    } else {
      console.log('네트워크 에러거나 타임아웃')
    }
    return Promise.reject(error)
  }
)

export default customAxios
