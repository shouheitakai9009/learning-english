import classNames from "classnames"
import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren<JSX.IntrinsicElements['button']> {
  color?: 'primary' | 'boost' | 'sad' | 'check'
  size?: 'md' | 'lg' | 'xl',
  outline?: boolean
}

export const Button = ({ color = 'primary', size = 'md', outline = false, className, children, ...props }: Props) => {
  return (
    <button
      type="button"
      className={
        classNames(
          {
            "rounded-md focus:outline-2 focus:outline-offset-2 outline-orange-600 disabled:cursor-not-allowed": true,
            "px-4 h-10": size === 'md',
            "px-2 h-10 text-3xl [&_svg]:w-6 [&_svg]:h-6 [&_svg_*]:h-5 [&_svg_*]:stroke-2": size === 'lg',
            "px-6 h-20 text-3xl [&_svg]:w-10 [&_svg]:h-10 [&_svg_*]:h-5 [&_svg_*]:w-5": size === 'xl',
            "bg-orange-500 text-white hover:bg-orange-600": color === 'primary' && !outline,
            "text-white [&_svg_*]:fill-yellow-400 bg-gradient-to-r from-red-500 via-red-400  to-orange-400": color === 'boost' && !outline,
            "text-white [&_svg_*]:fill-yellow-400 bg-gradient-to-r from-blue-500 via-blue-400  to-blue-400 disabled:opacity-30": color === 'sad' && !outline,
            "text-white [&_svg_*]:stroke-white bg-gradient-to-r from-green-600 via-green-500  to-green-500": color === 'check' && !outline,
            "text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white": color === 'primary' && outline

          },
          className
        )
      }
      {...props}
    >
      {children}
    </button>
  )
}