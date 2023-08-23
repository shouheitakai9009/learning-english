import { useQueryWrapper } from "@/services/queries/useQueryWrapper"
import { PartOfSpeech } from "@/types/api"

export const usePartOfSpeech = () => {
  const response = useQueryWrapper<PartOfSpeech[]>(
    ['parOfSpeech'],
    { url: 'part-of-speeches' }
  )

  return response
}