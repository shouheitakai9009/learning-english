interface Props extends React.PropsWithChildren<JSX.IntrinsicElements['label']> {
  required?: boolean
}

export const FormLabel = ({
  required,
  children,
  ...props
}: Props) => {

  return (
    <label
      className="text-sm text-slate-600 font-noto"
      {...props}
    >
      {required && (
        <span className="font-bold mr-2 text-red-500">*</span>
      )}
      {children}
      </label>
  )
}