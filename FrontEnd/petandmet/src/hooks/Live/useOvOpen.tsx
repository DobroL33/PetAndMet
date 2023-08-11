import { useMutation } from 'react-query'
import { useCookies } from 'react-cookie'
import { useAccessToken } from 'hooks/useAccessToken'
import { domain } from 'hooks/customQueryClient'
import customAxios from 'utils/axiosUtil'

interface CreateSession {
  center_uuid: string
  session_name: string
  session_id: string
  center_item_id: Object
  animal_uuid: string
}

export function createOVSession() {
  const [cookies, setCookie] = useCookies(['access_token'])
  const { accessToken, setAccessToken } = useAccessToken()

  const axiosData = async (credential: CreateSession) => {
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
      const response = await customAxios.post('/user', credential, config)
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
