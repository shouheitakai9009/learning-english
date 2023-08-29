import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { TextField } from "@/components/TextField"
import { AnswerFormatType } from "@/types/answer-format"
import { useRef } from "react"

interface Props {
  text: string
  format?: AnswerFormatType
  disabled?: boolean
  onChangeText: (text: string) => void
  onSubmit: () => void
  onUnknown: () => void
}

export const AnswerArea = ({
  text,
  format = 'english-to-japanese',
  disabled = false,
  onChangeText,
  onSubmit,
  onUnknown,
}: Props) => {

  const ref = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="h-52 flex flex-col justify-center items-center">
      <p className="tracking-widest mb-4">
        問題:&emsp;
        {format === 'english-to-japanese' && "上記の英単語の日本語の意味を書け"}
        {format === 'japanese-to-english' && "上記の日本単語の英訳を書け"}
      </p>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center"
        >
          <TextField
            ref={ref}
            value={text}
            disabled={disabled}
            ring
            autoFocus
            className="w-96 h-20 mr-4 font-bold text-3xl px-6 bg-slate-50 rounded-xl border-2 border-slate-100 placeholder:text-gray-300 focus:outline-offset-4 focus:outline-2 focus:outline-orange-400"
            placeholder={format === 'english-to-japanese' ? "日本語で意味を書け" : "日本語にあう英単語を書け"}
            onChange={e => onChangeText(e.target.value)}
          />
          <Button type="submit" size="xl" color="boost" className="mr-2">
            <Icon name="paper-airplane" />
          </Button>
          <Button type="button" disabled={disabled} size="xl" color="sad" onClick={onUnknown}>
            <Icon name="face-frown" />
          </Button>
        </form>
      </div>
    </div>
  )
}