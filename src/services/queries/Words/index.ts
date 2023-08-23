import { useQueryWrapper } from "@/services/queries/useQueryWrapper"
import { Word, IFindWordRequestParams, PartOfSpeech } from "@/types/api"

export const useWords = (params: IFindWordRequestParams) => {

  const response = useQueryWrapper<Array<{ partOfSpeech: PartOfSpeech } & Word>, IFindWordRequestParams>(
    ['words', params],
    { url: 'words', config: { params }}
  )

  return response
}