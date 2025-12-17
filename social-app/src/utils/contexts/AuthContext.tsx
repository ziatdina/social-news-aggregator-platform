import { createContext, useContext } from 'react'

import type { AuthResult } from '../services/authService'
import type { User } from '../types'

export interface AuthContextType {
  user: User | null                    
  isAuthenticated: boolean            
  isLoading: boolean                   
  login: (email: string, password: string) => Promise<AuthResult>
  register: (email: string, username: string, password: string) => Promise<AuthResult>
  logout: () => void               
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}