import { useMutationWrapper } from "../useMutationWrapper"

interface ILoginParams {
  email: string
  password: string
}

interface ILoginResponse {
  accessToken: string
}

export const useAuthLogin = () => {
  const mutation = useMutationWrapper<ILoginResponse, unknown, ILoginParams>({ url: "/auth/login" })

  return mutation
}
