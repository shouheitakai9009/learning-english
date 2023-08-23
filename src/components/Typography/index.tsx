import classNames from "classnames"

interface Props extends React.PropsWithChildren<JSX.IntrinsicElements['span']> {
  required?: boolean
}

export const Typography = (props: Props) => {
  return (
    <span
      {...props}
      className={classNames("font-noto", props.className)}
    >
      {props.children}
    </span>
  )
}