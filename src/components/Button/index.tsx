import classNames from "classnames"
import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren<JSX.IntrinsicElements['button']> {
  color?: 'primary'
  size?: 'md',
  outline?: boolean
}

export const Button = ({ color = 'primary', size = 'md', outline = false, className, children, ...props }: Props) => {
  return (
    <button
      {...props}
      type="button"
      className={
        classNames(
          {
            "rounded-md": true,
            "px-4 h-10": size === 'md',
            "bg-orange-500 text-white hover:bg-orange-600": color === 'primary' && !outline,
            "text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white": color === 'primary' && outline

          },
          className
        )
      }
    >
      {children}
    </button>
  )
}