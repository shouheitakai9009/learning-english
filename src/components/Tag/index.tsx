import classNames from "classnames"

type Props = JSX.IntrinsicElements['label'] & {
  text: string
  checked: boolean
  id?: string
  size?: 'sm' | 'md'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}


export const Tag = ({
  checked,
  id,
  text,
  size = 'md',
  onChange,
  ...props
}: Props) => {

  return (
    <div key={text} className="mx-1 mb-4">
      <input
        type="checkbox"
        id={id ?? undefined}
        className="w-0 h-0 opacity-0"
        checked={checked}
        onChange={onChange}
      />
      <label
        {...props}
        htmlFor={id ?? undefined}
        className={classNames("cursor-pointer rounded-full", props.className, {
          "bg-slate-200  text-slate-400": !checked,
          "bg-slate-600   text-white": checked,
          "px-4 py-2 text-sm": size === 'md',
          "px-3 py-1 text-xs": size === 'sm'
        })}
      >
        {text}
      </label>
    </div>
  )
}