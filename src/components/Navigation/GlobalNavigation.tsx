import { useLocation } from "react-router-dom"
import { useCallback } from "react"
import { NavigationItem, NavigationItemType } from "./Item"

type NavigationStateType = NavigationItemType & {
  children?: Omit<NavigationItemType, "icon">[]
}

const navigations: NavigationStateType[] = [
  {
    label: "Home", icon: "home", to: "/",
  },
  {
    label: "Flash card", icon: "banknotes", to: "/flashcard",
  },
  { label: "All words", icon: "book-open", to: "/words" },
  { label: "Fill sentence", icon: "clipboard-document-list", to: "/sentence" },
  { label: "Active recall", icon: "arrow-path", to: "/activerecall" },
  { label: "Browsing", icon: "document-text", to: "/browsing" },
]

export const GlobalNavigation = () => {

  const location = useLocation()
  const isSelected = useCallback((to: string): boolean => {
    if (location.pathname === '/' && to === '/') return true
    else if (location.pathname === '/' && to !== '/') return false
    else if (to.startsWith(location.pathname)) return true
    return false
  }, [location.pathname])

  return (
    <nav className="h-full w-80 flex flex-col items-center justify-between bg-white shadow-xl shadow-gray500">
      <ul className="w-full list-none px-2 py-2">
        {navigations.map(navigation => (
          <li key={navigation.label}>
            <NavigationItem
              selected={isSelected(navigation.to)}
              {...navigation}
            />
            {navigation.children && navigation.children.length > 0 && (
              <ul>
                {navigation.children.map(child => (
                  <li key={child.label}>
                    <NavigationItem
                      selected={isSelected(child.to)}
                      size="sm"
                      {...child}
                    />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}