import { useMutation, UseMutationResult } from 'react-query'
import { useCookies } from 'react-cookie'
import { useAccessToken } from 'hooks/useAccessToken'
import customAxios from 'utils/axiosUtil'

export interface SessionInfo {
  center_uuid: string
  session_name: string
  session_id: string
  center_item_id: []
  animal_uuid: string
}

interface Response {
  response: Result
}

interface Result {
  live_id: Response
}

export function createOvSession(): UseMutationResult<
  Response,
  unknown,
  SessionInfo,
  unknown
> {
  const [cookies, setCookie] = useCookies(['access_token'])
  const { accessToken, setAccessToken } = useAccessToken()

  const axiosData = async (credential: SessionInfo): Promise<Response> => {
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
      const response = await customAxios.post<Response>(
        '/live',
        credential,
        config
      )
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
  return useMutation<Response, unknown, SessionInfo, unknown>(axiosData)
}
