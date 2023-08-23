import { api } from "@/services/api"
import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

interface ILoginParams {
  email: string
  password: string
}

interface ILoginResponse {
  accessToken: string
}

export const useAuthLogin = () => {
  const mutation = useMutation<AxiosResponse<ILoginResponse>, unknown, ILoginParams>({
    mutationFn: params => api.post<ILoginResponse>("/auth/login", params)
  })

  return mutation
}
