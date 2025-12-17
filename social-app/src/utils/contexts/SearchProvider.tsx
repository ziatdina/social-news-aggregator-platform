import React, {useState, useCallback, useMemo } from 'react'

import { SearchContext, type SearchContextType } from './SearchContext'

interface SearchProviderProps {
    children: React.ReactNode
}

export const SearchProvider = ({children}: SearchProviderProps) => {
  const [searchQuery, setSearchQueryState] = useState<string>('')
    
  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQueryState('')
  }, [])

  const contextValue: SearchContextType = useMemo(() => ({
    searchQuery,
    setSearchQuery,
    clearSearch
  }), [searchQuery, setSearchQuery, clearSearch])

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  )
}