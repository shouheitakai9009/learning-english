import { JSX } from "react"
import classNames from "classnames"
import { useKeypressSound } from "@/utils/use_keypress_sound"

type Props = JSX.IntrinsicElements['input'] & {
  rightComponent?: JSX.Element
  ring?: boolean
}

export const TextField = ({
  rightComponent,
  ring = false,
  ...props
}: Props) => {

  const { onKeyDown, onKeyUp } = useKeypressSound()

  return (
    <label className="relative block">
      <input
        {...props}
        type='text'
        onKeyDown={() => ring && onKeyDown()}
        onKeyUp={() => ring && onKeyUp()}
        className={classNames("disabled:text-gray-400 disabled:cursor-not-allowed", props.className)}
      />
      {rightComponent}
    </label>
  )
}