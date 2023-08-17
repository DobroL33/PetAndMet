import { useQuery, UseQueryResult } from 'react-query'
import { useCookies } from 'react-cookie'
import { useAccessToken } from 'hooks/useAccessToken'
import customAxios from 'utils/axiosUtil'

export interface JoinSession {
  live_id: number
}

export interface Center {
  uuid: string
}

export interface Animal {
  uuid: string
  name: string
  age: number
  specie: string
  breed: string
  find_place: string
  enter_date: string
  photo_url: string
}

export interface JoinData {
  thumbnail: string
  center: Center
  animal: Animal
  live_id: number
  session_id: string
  session_name: string
}

interface Result {
  response: JoinData
}

export function joinOvSession(credential: string): UseQueryResult<Result> {
  const [cookies, setCookie] = useCookies(['access_token'])
  const { accessToken, setAccessToken } = useAccessToken()

  if (credential === '') {
    const axios = () => {
      return
    }
    return useQuery('fail', axios)
  }

  const axiosData = async (): Promise<Result> => {
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
      const response = await customAxios.get(
        `/live/detail?id=${credential}`,
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
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return useQuery<Result>(['joinSession', credential], axiosData)
}
