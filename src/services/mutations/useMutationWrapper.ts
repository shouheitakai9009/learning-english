import { UseMutationOptions, useMutation, UseMutationResult } from '@tanstack/react-query'
import { api } from '../api'
import { AxiosError } from 'axios'
import { useToasty } from '@/utils/use_toasty'

type IApiRequest = {
  url: string,
}

export const useMutationWrapper = <
  TData = unknown,
  TError = unknown,
  TVariables = void
>(
  request: IApiRequest,
  options?: UseMutationOptions<TData, TError, TVariables>
): UseMutationResult<TData, TError, TVariables, unknown> => {

  const { toast } = useToasty()

  const response = useMutation<TData, TError, TVariables>({
    mutationFn: params =>
      api.post(request.url, params)
        .then(axiosRes => axiosRes.data),
    onError: (error) => {
      const response = (error as AxiosError<{ message: string }>).response
      if (response)
        toast(response.data.message, { type: "error" })
    },
    ...options
  })
  return response
}