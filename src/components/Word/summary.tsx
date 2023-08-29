import { Icon } from "@/components/Icon"
import { Word, WordWithRandomFlash } from "@/types/api"

interface Props {
  word: WordWithRandomFlash
}

export const WordSummary = ({ word }: Props) => {

  const onPlayWord = (word: Word) => {
    const audio = new Audio(word.soundUrl)
    audio.play()
  }

  return (
    <div className="flex items-center justify-between cursor-pointer" onClick={() => onPlayWord(word)}>
      <div className="flex items-center">
        <span className="text-lg border border-black w-6 h-6 mr-2 flex items-center justify-center">{word.partOfSpeech.name.substring(0,1)}</span>
        <div>
          <div className="text-2xl">{word.word}</div>
          <span className="text-gray-500 text-md tracking-wider">{word.phonetic}</span>
        </div>
      </div>
      {word.soundUrl && (
        <Icon
          name="musical-note"
          className="[&_*]:w-5 [&_*]:h-5 ml-2 [&_*]:stroke-pink-500"
        />
      )}
    </div>
  )
}