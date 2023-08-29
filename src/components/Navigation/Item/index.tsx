import { Link } from "react-router-dom"
import { Icon } from "@/components/Icon"
import { IconName } from "@/types/icons"
import classNames from "classnames"

export type NavigationItemType = {
  label: string
  icon?: IconName
  to?: string
}

interface Props extends NavigationItemType {
  selected: boolean
  size?: 'sm' | 'md'
}

export const NavigationItem = ({
  label,
  icon,
  to,
  selected,
  size = "md",
}: Props) => {

  return (
    <Link
      to={to ?? "#"}
      className={
        classNames('group w-full flex justify-between items-center rounded-lg', {
          'hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-500 hover:text-white': true,
          'bg-gradient-to-r from-orange-400 to-orange-500 text-white': selected,
          "h-10 pl-6 pr-2": size === 'sm',
          "h-12 px-4 my-1": size === 'md',
        })
      }
    >
      <p className="flex items-center">
        <Icon
          name={icon ?? "minus-small"}
          className={
            classNames({
              "[&_*]:w-4 [&_*]:h-4": size === 'sm',
              "[&_*]:w-5 [&_*]:h-5": size === 'md',
              "[&_*]:group-hover:stroke-white": true,
              "[&_*]:stroke-white": selected
            })
          }
        />
        <span
          className={classNames("ml-3", {
            "text-sm": size === 'sm',
            "text-md": size === 'md',
          })}
        >
          {label}
        </span>
      </p>
      {size === 'sm' && (
        <Icon
          name="chevron-right"
          className="[&_*]:stroke-black [&_*]:group-hover:stroke-white [&_*]:w-4 [&_*]:h-4"
        />
      )}
    </Link>
  )
}