import type { IconName } from '@/types/icons'

const iconPath = "../../assets/images"
type IconPathMap = {
  [I in IconName as `${typeof iconPath}/${I}.svg`]: string
}

type Props = JSX.IntrinsicElements['img'] & {
  name: IconName
}

const iconPathMap = import.meta.glob("../../assets/images/*.svg", {
  as: "raw",
  eager: true
}) as IconPathMap

export const Icon = ({
  name,
  ...props
}: Props) => {

  return (
    <span
      {...props}
      dangerouslySetInnerHTML={{ __html: iconPathMap[`${iconPath}/${name}.svg` as const] }}
    />
  )
}