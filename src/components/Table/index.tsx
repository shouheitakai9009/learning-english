import classNames from "classnames"

export const Table = ({
  children,
  ...props
}: React.PropsWithChildren<JSX.IntrinsicElements['table']>) => {

  return (
    <table {...props}>{children}</table>
  )
}

export const THead = ({
  children,
  ...props
}: React.PropsWithChildren<JSX.IntrinsicElements['tr']>) => {

  return (
    <thead>
      <tr {...props}>
        {children}
      </tr>
    </thead>
  )
}

export const Th = ({
  children,
  ...props
}: React.PropsWithChildren<JSX.IntrinsicElements['th']>) => {

  return (
    <th
      {...props}
      className={classNames("bg-slate-200 text-sm h-10 text-left", props.className)}
    >
      {children}
    </th>
  )
}

export const TBody = ({
  children,
  ...props
}: React.PropsWithChildren<JSX.IntrinsicElements['tbody']>) => {

  return (
    <tbody {...props}>
      {children}
    </tbody>
  )
}

export const TDataRow = ({
  children,
  ...props
}: React.PropsWithChildren<JSX.IntrinsicElements['tr']>) => {

  return (
    <tr {...props}>
      {children}
    </tr>
  )
}

export const TDataCell = ({
  children,
  ...props
}: React.PropsWithChildren<JSX.IntrinsicElements['td']>) => {

  return (
    <td
      {...props}
      className={classNames("bg-white text-sm h-12 border-b border-slate-200 px-2", props.className)}
    >
      {children}
    </td>
  )
}