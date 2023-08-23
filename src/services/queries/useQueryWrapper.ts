import { AxiosRequestConfig } from 'axios'
import { useQuery, QueryKey, UseQueryResult, UseQueryOptions } from '@tanstack/react-query'
import { api } from '../api'

type IApiRequest<TRequestParams> = {
  url: string,
  config?: AxiosRequestConfig<TRequestParams> | undefined
}

export const useQueryWrapper = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  request: IApiRequest<TData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'initialData'
  > & { initialData?: () => undefined },
): UseQueryResult<TData> => {
  const response = useQuery<TQueryFnData, TError, TData, TQueryKey>(queryKey, {
    queryFn: () => api.get(request.url, request.config).then(axiosRes => axiosRes.data),
    ...options
  })
  return response
}