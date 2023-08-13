import { useMutation, UseMutationResult } from 'react-query'
import { useCookies } from 'react-cookie'
import { useAccessToken } from 'hooks/useAccessToken'
import { domain } from 'hooks/customQueryClient'
import customAxios from 'utils/axiosUtil'

interface Token {
  token: String
}
interface Response {
  response: Token
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
  const [_, setCookie] = useCookies(['access_token'])
  const { setAccessToken } = useAccessToken()
  return useMutation<Response, unknown, LoginCredentials, unknown>(axiosData, {
    onSuccess(data, variables, context) {
      setCookie('access_token', 'Bearer ' + data.response.token, {
        secure: true,
        sameSite: 'strict',
        path: '/',
      })
      setAccessToken('Bearer ' + data.response.token)
    },
  })
}
