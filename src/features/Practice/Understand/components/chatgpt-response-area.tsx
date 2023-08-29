import { motion } from "framer-motion"
import { useRandomFlashWords } from "@/services/queries/Words/useRandomFlashWords"
import { useEffect } from "react"
import { useChatCompletions } from "@/services/queries/ChatCompletions"
import { LoadingRectangleContent } from "@/components/Loading/rectangle-content"
import { Button } from "@/components/Button"
import UseAnimations from "react-useanimations"
import loading from "react-useanimations/lib/loading"
import { useRecoilState, useRecoilValue } from "recoil"
import { selectedWord } from "../atoms/understandAtom"

export const CharGPTResponseArea = () => {

  const requestCount = useRecoilValue(selectedWord.requestCount)
  const [text, setText] = useRecoilState(selectedWord.text)
  const [prompt, setPrompt] = useRecoilState(selectedWord.prompt)
  const [submitting, setSubmitting] = useRecoilState(selectedWord.submitting)
  const [currentIndex, setCurrentIndex] = useRecoilState(selectedWord.index)
  const [multiple, setMultiple] = useRecoilState(selectedWord.multiple)
  const wordsQuery = useRandomFlashWords()
  const chatQuery = useChatCompletions(prompt ?? "", !!prompt && wordsQuery.isSuccess)
  const isLoading = chatQuery.isFetching || chatQuery.isLoading

  const onClose = () => {
    setCurrentIndex(null)
    setMultiple(false)
    setSubmitting(false)
    setPrompt(null)
    setText("")
  }

  const onSubmit = () => {
    setMultiple(true)
    setTimeout(() => setSubmitting(false), 0)
  }

  useEffect(() => {
    if (submitting) {
      if (prompt === "" && text !== "" && wordsQuery.isSuccess && currentIndex !== null) {
        const word = wordsQuery.data?.[currentIndex].word
        const partOfSpeechId = wordsQuery.data?.[currentIndex].partOfSpeechId
        if (!selectedWord || !partOfSpeechId) return

        setPrompt(`
          今から単語「${word}」かつ品詞は「${partOfSpeechId}」（以下「${word}」）を使用した英文を掲載するので、
          まず「${word}」の用法を正しく使用できているかチェックします。正しくない場合、なぜ間違っているのかアドバイスをしてあげてください。
          必ず回答は日本語でお願いします。以下が英語の文章です。「${text}」
        `)
      }
    }
    return () => setPrompt("")
  }, [text, wordsQuery.isSuccess, currentIndex, submitting, prompt])

  useEffect(() => {
    if (requestCount > 0 && currentIndex !== null) {
      const word = wordsQuery.data?.[currentIndex].word
      setPrompt(`
        ChatGPTの回答「${prompt}」に関する質問をこれからします。
        おそらく「${word}」に関する質問だと思いますが丁寧に返答してください。
        必ず回答は日本語でお願いします。以下が質問です。「${text}」
      `)
    }
  }, [requestCount])

  useEffect(() => {
    if (multiple && !submitting) {
      setText("")
      setPrompt("")
      setSubmitting(false)
    }
  }, [multiple, submitting])

  return (
    !!prompt && currentIndex !== null && (
      <motion.div
        key={`${currentIndex}_2`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute bottom-32 left-0 w-full flex justify-center"
      >
        <section className="relative w-1/2 h-96 overflow-y-scroll bg-white shadow-2xl shadow-gray-300 rounded-lg py-10 px-16">
          <p className="h-12 font-bold text-md pb-2 border-b border-gray-400">
            <span className="text-3xl">"{wordsQuery.data?.[currentIndex].word}"</span>を使用した英文を作るのでアドバイスください。
          </p>
          <p className="pt-6 h-56 text-md overflow-y-scroll leading-7">
            {
              isLoading
                ?
                  <>
                  <LoadingRectangleContent wrapperClassName="h-7 w-full mb-3" />
                  <LoadingRectangleContent wrapperClassName="h-7 w-3/4 mb-3" />
                  <LoadingRectangleContent wrapperClassName="h-7 w-1/2 mb-3" />
                  <LoadingRectangleContent wrapperClassName="h-7 w-1/4 mb-3" />
                  <p className="text-sm font-bold text-center">
                    ChatGPT先生にリクエスト中です...
                  </p>
                </>
              :
                <p className="whitespace-pre-wrap">
                  {`${chatQuery.data?.choices?.[0].message.content}`}
                </p>
            }
          </p>
          <section className="absolute h-16 bottom-0 left-0 w-full border-t border-gray-200 flex justify-end items-center px-8">
            <Button type="button" disabled={isLoading} color="primary" outline size="md" className="mr-2" onClick={onClose}>
              {
                isLoading
                  ? <UseAnimations animation={loading} strokeColor='orange' />
                  : "閉じる"
              }
            </Button>
            <Button type="submit" disabled={isLoading} color="primary" size="md" onClick={onSubmit}>
              {
                isLoading
                  ? <UseAnimations animation={loading} strokeColor='white' />
                  : "もう一度尋ねる"
              }
            </Button>
          </section>
        </section>
      </motion.div>
    )
  )
}