import { useMutation, UseMutationResult } from 'react-query'
import { useCookies } from 'react-cookie'
import { useAccessToken } from 'hooks/useAccessToken'
import { domain } from 'hooks/customQueryClient'
import customAxios from 'utils/axiosUtil'
import jwtDecode from 'jwt-decode'

interface Token {
  token: String
  center_uuid: string
}
interface Response {
  response: Token
}

interface JwtDecode {
  sub: string
}

export interface LoginCredentials {
  id: String
  password: String
}

const axiosData = async (credentials: LoginCredentials): Promise<Response> => {
  try {
    const response = await customAxios.post<Response>(
      `${domain}/user`,
      credentials
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export function useLoginMutation(): UseMutationResult<
  Response,
  unknown,
  LoginCredentials,
  unknown
> {
  const [cookie, setCookie] = useCookies(['access_token'])
  const { setAccessToken, setCenterUuid, setUserUuid } = useAccessToken()
  return useMutation<Response, unknown, LoginCredentials, unknown>(axiosData, {
    onSuccess(data, variables, context) {
      const accessToken = `${data.response.token}`
      const jwtDecodedToken = jwtDecode<JwtDecode>(`"${accessToken}"`)
      const userUuid = jwtDecodedToken.sub
      setCookie('access_token', 'Bearer ' + data.response.token, {
        secure: true,
        sameSite: 'strict',
        path: '/',
      })
      setAccessToken('Bearer ' + data.response.token)
      setCenterUuid(data.response.center_uuid)
      setUserUuid(userUuid)
    },
  })
}
