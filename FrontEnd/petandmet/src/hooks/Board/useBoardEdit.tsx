import { useMutation } from 'react-query'
import { useCookies } from 'react-cookie'
import { useAccessToken } from 'hooks/useAccessToken'
import customAxios from 'utils/axiosUtil'

export interface EditCredential {
  id: number
  type: string
  user: string
  center: string
  title: string
  content: string
}

export function useBoardEdit() {
  const [cookies, setCookie] = useCookies(['access_token'])
  const { accessToken, setAccessToken } = useAccessToken()

  const axiosData = async (credential: EditCredential) => {
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
      const type = credential.type
      const response = await customAxios.patch(
        `/board/${type}`,
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
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return useMutation(axiosData)
}
