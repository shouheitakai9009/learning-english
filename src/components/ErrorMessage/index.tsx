import classNames from "classnames"

interface Props extends React.PropsWithChildren<JSX.IntrinsicElements['p']> {
  text?: string
}

export const ErrorMessage = ({ text, ...props }: Props) => {
  return (
    text && (
      <p
        className={classNames("text-red-600 text-sm my-2", props.className)}
        {...props}
      >
        {text}
      </p>
    )
  )
}