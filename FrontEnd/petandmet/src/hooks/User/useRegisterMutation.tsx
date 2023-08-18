import { useMutation, UseMutationResult } from 'react-query'
import { domain } from 'hooks/customQueryClient'
import axios, { AxiosResponse } from 'axios'

export interface RegisterCredential {
  id: string
  password: string
  email: string
  phone: string
  name: string
  role_type: string
  center_name: string
  center_address: string
  center_phone: string
  center_email: string
}

const axiosData = async (
  credentials: RegisterCredential
): Promise<AxiosResponse> => {
  const response = await axios.post(`${domain}/user/new`, credentials)
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
