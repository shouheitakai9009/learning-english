import { api } from "@/services/api"
import { RandomFlashHistory } from "@/types/api"
import { useMutation } from "@tanstack/react-query"

export interface IRequestRandomFlashAnswer extends Pick<RandomFlashHistory, "wordId" | "success" | "text"> {}

export const useRandomFlashAnswer = () => {
  const mutation = useMutation({
    mutationFn: (params: IRequestRandomFlashAnswer) =>
      api.post<RandomFlashHistory>("/random-flash-history/answer", params)
  })

  return mutation
}
