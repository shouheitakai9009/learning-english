import { useQueryWrapper } from "@/services/queries/useQueryWrapper"
import { IFindWordRequestParams, WordWithDefinitionAndPartOfSpeechType } from "@/types/api"

export const useWords = (params: IFindWordRequestParams) => {

  const response = useQueryWrapper<WordWithDefinitionAndPartOfSpeechType[], IFindWordRequestParams>(
    ['words', params],
    { url: 'words', config: { params }}
  )

  return response
}