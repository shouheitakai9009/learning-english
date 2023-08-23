import { JSX } from "react"

type Props = JSX.IntrinsicElements['input'] & {
  rightComponent?: JSX.Element
}

export const TextField = ({
  rightComponent,
  ...props
}: Props) => {
  return (
    <label className="relative">
      <input type='text' {...props} />
      {rightComponent}
    </label>
  )
}