import React, { useState, useEffect, useCallback, useMemo } from 'react'

import { AuthContext } from './AuthContext'
import { 
  getCurrentUser,           
  loginUser,                
  registerUser,            
  logoutUser,              
  type AuthResult          
} from '../services/authService'

import type { User } from '../types/User'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUser = () => {
      setIsLoading(true)

      try {
        const currentUser = getCurrentUser()

        setUser(currentUser)
      } catch (error) {
        console.error('Ошибка загрузки пользователя:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true)

    try {
      const result = loginUser(email, password)
      
      if (result.success && result.user) {
        setUser(result.user)
      }
      
      return result
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (
    email: string, 
    username: string, 
    password: string
  ): Promise<AuthResult> => {
    setIsLoading(true)

    try {
      const result = registerUser(email, username, password)
      
      if (result.success && result.user) {
        setUser(result.user)
      }
      
      return result
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    logoutUser()
    setUser(null)
  }, [])

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  }), [user, isLoading, login, register, logout])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}