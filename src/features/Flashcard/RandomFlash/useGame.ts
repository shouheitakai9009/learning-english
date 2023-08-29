import { useRandomFlashAnswer } from "@/services/mutations/RandomFlash/answer"
import { useRandomFlashWords } from "@/services/queries/Words/useRandomFlashWords"
import { RandomFlashHistory, WordWithRandomFlash } from "@/types/api"
import { useCallback, useEffect, useState } from "react"
import successSound from "@/assets/sounds/success.mp3"
import mistakeSound from "@/assets/sounds/mistake.mp3"
import { useFlipCard } from "@/utils/use_flip_card"

export type WordWithSuccessType = Partial<{
  word: WordWithRandomFlash,
  success: boolean
}>

export const useGame = () => {

  const wordsQuery = useRandomFlashWords()
  const answerMutation = useRandomFlashAnswer()
  const { controls, isFlipped, setIsFlipped, handleRotate } = useFlipCard()
  const [results, setResults] = useState<WordWithSuccessType[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [answerText, setAnswerText] = useState<string>("")

  const onAnswer = useCallback((text?: RandomFlashHistory["text"]) => {
    if (wordsQuery.isSuccess) {
      let success = false
      const answeredWord = wordsQuery.data?.[currentIndex]
      if (answeredWord) {
        if (text) {
          const resultDesinition =  answeredWord.definitions.find(definition => definition.definitionJp.includes(text))
          success = answeredWord.meaning.includes(text) || !!resultDesinition
        }
        answerMutation.mutate({ wordId: answeredWord.id, success, text: text ?? null })
      }
    }
  }, [wordsQuery.isSuccess, wordsQuery.data, currentIndex])

  useEffect(() => {
    if (answerMutation.isSuccess) {
      const answeredWord = wordsQuery.data?.find(word => word.id === answerMutation.data.data.wordId)
      if (answeredWord) setResults([...results, {
        word: answeredWord,
        success: answerMutation.data?.data.success,
      }])
      handleRotate()
      new Audio(answerMutation.data?.data.success ? successSound : mistakeSound).play()
    }
  }, [answerMutation.isSuccess])

  useEffect(() => {
    if (!isFlipped) setAnswerText("")
    else setCurrentIndex(old => old + 1)
  }, [isFlipped])

  return {
    controls,
    isFlipped,
    currentIndex,
    wordsQuery,
    results,
    answerText,
    handleRotate,
    setResults,
    setAnswerText,
    setIsFlipped,
    onAnswer,
  }
}