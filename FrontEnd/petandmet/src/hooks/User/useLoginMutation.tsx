import { useMutation, UseMutationResult } from 'react-query'
import { useCookies } from 'react-cookie'
import { useAccessToken } from 'hooks/useAccessToken'
import { domain } from 'hooks/customQueryClient'
import customAxios from 'utils/axiosUtil'
interface Token {
  response: String
}

export interface LoginCredentials {
  id: String
  password: String
}

const axiosData = async (credentials: LoginCredentials): Promise<Token> => {
  try {
    const response = await customAxios.post<Token>(
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
  Token,
  unknown,
  LoginCredentials,
  unknown
> {
  const [_, setCookie] = useCookies(['access_token'])
  const { setAccessToken } = useAccessToken()
  return useMutation<Token, unknown, LoginCredentials, unknown>(axiosData, {
    onSuccess(data, variables, context) {
      setCookie('access_token', 'Bearer ' + data.response, {
        secure: true,
        sameSite: 'strict',
        path: '/',
      })
      setAccessToken('Bearer ' + data.response)
    },
  })
}
