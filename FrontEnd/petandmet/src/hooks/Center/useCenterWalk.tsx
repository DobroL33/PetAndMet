import { useQuery, useMutation } from 'react-query'
import { useCookies } from 'react-cookie'
import { useAccessToken } from 'hooks/useAccessToken'
import customAxios from 'utils/axiosUtil'
import { WalkStore } from 'hooks/Center/CenterWalkStore'

export interface WalkStatus {
  walk_id: number
  status_result: string
}

export function GetCenterWalk() {
  const walks = WalkStore()
  const [cookies, setCookie] = useCookies(['access_token'])
  const { accessToken, setAccessToken } = useAccessToken()
  const axiosData = async () => {
    try {
      let token = accessToken
      if (token === '') {
        setAccessToken(cookies.access_token)
        token = cookies.access_token
      }
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      }
      const response = await customAxios.get('/walk/center', config)
      if (response.config.headers.Authorization !== token) {
        setCookie('access_token', response.config.headers.Authorization, {
          secure: true,
          sameSite: 'strict',
          path: '/',
        })
        setAccessToken(response.config.headers.Authorization)
      }
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return useQuery('centerWalk', axiosData, {
    onSuccess: data => {
      if (data && data.response !== undefined) {
        walks.setWalkTimes(data.response.walk_times)
        walks.setTotal(data.response.total)
      }
    },
  })
}

export function PostCenterWalk() {
  const [cookies, setCookie] = useCookies(['access_token'])
  const { accessToken, setAccessToken } = useAccessToken()
  const axiosData = async (data: WalkStatus) => {
    try {
      let token = accessToken
      if (token === '') {
        setAccessToken(cookies.access_token)
        token = cookies.access_token
      }
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      }
      const response = await customAxios.post(`/walk/status`, data, config)
      if (response.config.headers.Authorization !== token) {
        setCookie('access_token', response.config.headers.Authorization, {
          secure: true,
          sameSite: 'strict',
          path: '/',
        })
        setAccessToken(response.config.headers.Authorization)
      }
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return useMutation(axiosData)
}

const GetWalkResigster = async (accessToken: string | unknown) => {
  try {
    const res = await customAxios.get('/walk/center', {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
    // console.log('신청 받음 산책 정보 획득', res.data.response)
    return res.data.response.walk_times
  } catch (error) {
    console.log(error)
  }
}

interface postWalk {
  walk_id: number
  status_result: string
}

const PostWalkUpdate = async (
  params: postWalk,
  accessToken: string | unknown
) => {
  try {
    const res = await customAxios.post('/walk/status', params, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
    if (res.data.success) {
      console.log('산책 수정 완료', res.data)
    } else {
      console.log('산책 수정 실패', res.data.error)
    }
    console.log('산책 수정', res)
  } catch (error) {
    console.log(error)
  }
}

export { GetWalkResigster, PostWalkUpdate }
