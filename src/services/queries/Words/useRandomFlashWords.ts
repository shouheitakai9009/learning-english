import { useQueryWrapper } from "@/services/queries/useQueryWrapper"
import { WordWithRandomFlash } from "@/types/api"

export const useRandomFlashWords = () => {

  const response = useQueryWrapper<WordWithRandomFlash[]>(
    ['words/random-flash'],
    { url: 'words/random-flash'}
  )

  return response
}