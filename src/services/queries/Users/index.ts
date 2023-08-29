import { useQueryWrapper } from "@/services/queries/useQueryWrapper"
import { User } from "@/types/api"

export const useUser = (enabled: boolean) => {
  const response = useQueryWrapper<User>(
    ['users'],
    { url: 'users/get' },
    { enabled }
  )

  return response
}

export interface IAuthUser {
  sub: number
  username: string
  iat: number
  exp: number
}

export const useAuthProfile = (accessToken?: string) => {

  const response = useQueryWrapper<IAuthUser>(
    ['users/auth-profile'],
    { url: 'auth/profile', config: { headers: { Authorization: `Bearer ${accessToken}` }}},
    { enabled: !!accessToken },
  )

  return response
}