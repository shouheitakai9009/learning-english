import { useQueryWrapper } from "@/services/queries/useQueryWrapper"
import { HistoryWithWord } from "@/types/api"

export const useRandomFlashHistory = () => {
  const response = useQueryWrapper<HistoryWithWord[]>(
    ['randomFlashHistory'],
    { url: 'random-flash-history/histories' }
  )

  return response
}