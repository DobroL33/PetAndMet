import { useMutation, UseMutationResult } from 'react-query'
import axios from 'axios'

interface Token {
  response: String
}

export interface LoginCredentials {
  id: String
  password: String
}

const axiosData = async (credentials: LoginCredentials): Promise<Token> => {
  const response = await axios.post<Token>(
    'https://i9b302.p.ssafy.io/api/v1/user',
    credentials
  )
  return response.data
}

export function useLoginMutation(): UseMutationResult<
  Token,
  unknown,
  LoginCredentials,
  unknown
> {
  return useMutation<Token, unknown, LoginCredentials, unknown>(axiosData, {
    onSuccess(data, variables, context) {},
  })
}
