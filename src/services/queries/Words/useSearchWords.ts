import { useQueryWrapper } from "@/services/queries/useQueryWrapper"
import { IFindWordRequestParams, WordWithRandomFlash } from "@/types/api"

export const useSearchWords = (params: IFindWordRequestParams) => {

  const response = useQueryWrapper<WordWithRandomFlash[], IFindWordRequestParams>(
    ['words/search', params],
    { url: 'words/search', config: { params }}
  )

  return response
}