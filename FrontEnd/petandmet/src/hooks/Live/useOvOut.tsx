import { useMutation } from 'react-query'
import { useCookies } from 'react-cookie'
import { useAccessToken } from 'hooks/useAccessToken'
import customAxios from 'utils/axiosUtil'

export function removeOvSession() {
  const [cookies, setCookie] = useCookies(['access_token'])
  const { accessToken, setAccessToken } = useAccessToken()

  const axiosData = async (liveId: number) => {
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
      const response = await customAxios.delete(`/live?id=${liveId}`, config)
      if (response.config.headers.Authorization !== token) {
        setCookie('access_token', response.config.headers.Authorization, {
          secure: true,
          sameSite: 'strict',
          path: '/',
        })
        setAccessToken(response.config.headers.Authorization)
      }
      return response.data
    } catch (error) {}
  }
  return useMutation(axiosData)
}
