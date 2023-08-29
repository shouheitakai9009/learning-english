import { OpenAI } from "openai"
import { useQuery } from "@tanstack/react-query"
import { useSetRecoilState } from "recoil"
import { selectedWord } from "@/features/Practice/Understand/atoms/understandAtom"

export const useChatCompletions = (prompt?: string, enabled?: boolean) => {

  const setPrompt = useSetRecoilState(selectedWord.prompt)
  const response = useQuery<unknown, unknown, OpenAI.Chat.Completions.ChatCompletion>(["chatgpt", prompt ?? ""], {
    queryFn: () => {
      setPrompt(prompt ?? "")
      const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true })
      return openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt ?? "" }],
      })
    },
    enabled: !!prompt && enabled,
    cacheTime: 10,
    staleTime: 2,
  })

  return response
}