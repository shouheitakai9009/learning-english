import { motion } from "framer-motion"
import { SpecialTextfield } from "./special-textfield"
import { useRandomFlashWords } from "@/services/queries/Words/useRandomFlashWords"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { useChatCompletions } from "@/services/queries/ChatCompletions"
import { selectedWord } from "../atoms/understandAtom"

export const PracticeSolution = () => {

  const [placeholder, setPlaceholder] = useState<string>("")
  const prompt = useRecoilValue(selectedWord.prompt)
  const wordsQuery = useRandomFlashWords()
  const currentIndex = useRecoilValue(selectedWord.index)
  const multiple = useRecoilValue(selectedWord.multiple)
  const chatQuery = useChatCompletions(prompt ?? undefined, !!prompt)

  useEffect(() => {
    if (currentIndex !== null && wordsQuery.isSuccess) {
      if (!multiple) {
        setPlaceholder(`「${wordsQuery.data[currentIndex].word}」を使った英文章を書いてアドバイスを受けよう！`)
      } else {
        setPlaceholder(`「${wordsQuery.data[currentIndex].word}」に関すること何でも聞いちゃっておっけい！`)
      }
    }
  }, [currentIndex, wordsQuery.data, multiple]);

  return (
    currentIndex !== null && (
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute bottom-4 left-0 w-full h-24"
      >
        <section className="flex justify-center items-center">
          <SpecialTextfield
            disabled={!!prompt && (chatQuery.isLoading || chatQuery.isFetching)}
            placeholder={placeholder}
          />
        </section>
      </motion.div>
    )
  )
}