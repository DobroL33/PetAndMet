import { useMutation, UseMutationResult } from 'react-query'
import { domain } from '../customQueryClient'
import axios, { AxiosResponse } from 'axios'

export interface RegisterCredential {
  id: string
  password: string
  email: string
  phone: string
  name: string
  role_type: string
}

const axiosData = async (
  credentials: RegisterCredential
): Promise<AxiosResponse> => {
  const response = await axios.post(`${domain}/user/new`, credentials)
  console.log(response.data)
  return response.data
}
export function useRegisterMutation(): UseMutationResult<
  AxiosResponse,
  unknown,
  RegisterCredential,
  unknown
> {
  return useMutation<AxiosResponse, unknown, RegisterCredential, unknown>(
    axiosData
  )
}
