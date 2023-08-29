import { WordWithRandomFlash } from "@/types/api"
import { useEffect } from "react"

interface Props {
  isFlipped: boolean
  word: WordWithRandomFlash | null
}

export const QuestionArea = ({ word, isFlipped }: Props) => {

  useEffect(() => {
    if (word && word.soundUrl && !isFlipped) new Audio(word?.soundUrl).play()
  }, [word, isFlipped])

  return (
    <div>
      <div>
        <p className="text-6xl tracking-wider mb-4 flex items-center">
          {word?.partOfSpeech && (
            <p className="border-4 border-black p-2 flex justify-center items-center text-4xl mr-4">
              {word?.partOfSpeech.name.substring(0,1)}
            </p>
          )}
          {word?.word}
        </p>
        {
          word?.phonetic && word?.soundUrl && (
            <p className="text-2xl text-gray-500 tracking-wider">{word?.phonetic}</p>
          )
        }
      </div>
    </div>
  )
}