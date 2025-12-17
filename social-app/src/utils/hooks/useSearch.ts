import { useContext } from "react"

import { SearchContext } from "../contexts/SearchContext"

export const useSearch = () => {
  const context = useContext(SearchContext)

  if (context === undefined) {
    throw new Error('Убедитесь, что ваш компонент обернут в <SearchProvider>')
  }

  return context
}