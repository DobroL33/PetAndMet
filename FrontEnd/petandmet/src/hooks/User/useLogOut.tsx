import { useMutation } from 'react-query'
import { useCookies } from 'react-cookie'
import customAxios from 'utils/axiosUtil'
import { useAccessToken } from 'hooks/useAccessToken'

export function UserLogOut() {
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
      const response = await customAxios.delete(`/user`, config)
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
