import { useKeypressSound } from "@/utils/use_keypress_sound"
import classNames from "classnames"
import { PropsWithChildren, useEffect, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { selectedWord } from "../atoms/understandAtom"

interface Props extends PropsWithChildren<Omit<JSX.IntrinsicElements['input'], "onSubmit">> {}

export const SpecialTextfield = (props: Props) => {

  const { onKeyDown, onKeyUp } = useKeypressSound()
  const setRequestCount = useSetRecoilState(selectedWord.requestCount)
  const setCurrentIndex = useSetRecoilState(selectedWord.index)
  const [text, setText] = useRecoilState(selectedWord.text)
  const [submitting, setSubmitting] = useRecoilState(selectedWord.submitting)
  const [focused, setFocused] = useState<boolean>(false)

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown()
    if (e.key === "Enter" && text !== "") {
      setSubmitting(true)
    } else if (e.key === "Escape") {
      setCurrentIndex(null)
    }
  }

  useEffect(() => {
    if (submitting) setRequestCount(old => old + 1)
  }, [submitting])

  return (
    <label
      className={
        classNames({
          "rounded-full w-1/2 border-4 border-transparent bg-origin-border bg-clip-border bg-gradient-to-tr": true,
          "shadow-xl shadow-red-300": true,
          "from-pink-500 to-purple-500": !focused,
          "from-red-600 to-orange-500": focused,
        })
      }
      style={{
        mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box",
        maskComposite: "exclude"
      }}
    >
      <input
        {...props}
        type="text"
        value={text}
        className={
          classNames("w-full h-20 rounded-full text-xl px-6 outline-none disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed")
        }
        disabled={submitting || props.disabled}
        autoFocus={true}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={e => !props.disabled && handleKeyDown(e)}
        onKeyUp={() => !props.disabled && onKeyUp()}
        onChange={e => setText(e.target.value)}
        onSubmit={() => {}}
      />
    </label>
  )
}