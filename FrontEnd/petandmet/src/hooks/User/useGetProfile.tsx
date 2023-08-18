import { useQuery, UseQueryResult } from 'react-query'
import { useProfile, Profile } from 'hooks/User/ProfileStore'
import customAxios from 'utils/axiosUtil'
interface Result {
  response: Profile
}

export function useProfileQuery(token: string): UseQueryResult<Result> {
  const profileStore = useProfile()
  const axiosProfile = async (): Promise<Result> => {
    try {
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      }
      const response = await customAxios.get('/user', config)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return useQuery<Result>('userProfile', axiosProfile, {
    onSuccess: data => {
      if (data && data.response !== undefined) {
        profileStore.setAttendance(data.response.attendance)
        profileStore.setName(data.response.name)
        profileStore.setEmail(data.response.email)
        profileStore.setPhone(data.response.phone)
        profileStore.setDonate_grade(data.response.donate_grade)
        profileStore.setWalk_grade(data.response.walk_grade)
      }
    },
  })
}
