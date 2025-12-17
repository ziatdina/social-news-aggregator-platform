import { createAvatar } from './avatarService'
import { storage, STORAGE_KEYS } from './localStorageService'

import type { User } from '../types/User'

export interface AuthResult {
  success: boolean
  user?: User
  error?: string
}

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  
  if (!email) return 'Email обязателен'
  if (!emailRegex.test(email)) return 'Введите корректный email'

  return null
}

export const validatePassword = (password: string): string | null => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/
  
  if (!password) return 'Пароль обязателен'
  if (password.length < 8) return 'Пароль должен содержать минимум 8 символов'

  if (!passwordRegex.test(password)) {
    return 'Пароль должен содержать: заглавную, строчную букву, цифру и спецсимвол'
  }

  return null
}

export const validateUsername = (username: string): string | null => {
  if (!username) return 'Имя пользователя обязательно'
  if (username.length < 2) return 'Имя должно содержать минимум 2 символа'
  if (username.length > 30) return 'Имя не должно превышать 30 символов'

  return null
}

export const getUsers = (): User[] => {
  return storage.get<User[]>(STORAGE_KEYS.USERS) || []
}

const saveUsers = (users: User[]): void => {
  storage.set(STORAGE_KEYS.USERS, users)
}

export const getCurrentUser = (): User | null => {
  return storage.get<User>(STORAGE_KEYS.CURRENT_USER)
}

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    storage.set(STORAGE_KEYS.CURRENT_USER, user)
  } else {
    storage.remove(STORAGE_KEYS.CURRENT_USER)
  }
}

export const registerUser = (
  email: string,
  username: string,
  password: string
): AuthResult => {
  const emailError = validateEmail(email)

  if (emailError) return { success: false, error: emailError }
  
  const usernameError = validateUsername(username)

  if (usernameError) return { success: false, error: usernameError }
  
  const passwordError = validatePassword(password)

  if (passwordError) return { success: false, error: passwordError }
  
  const users = getUsers()

  if (users.some(user => user.email === email)) {
    return { 
      success: false, 
      error: 'Пользователь с таким email уже существует' 
    }
  }
  
  const newUser: User = {
    id: Date.now().toString(),
    email,
    username,
    password, 
    avatar: createAvatar(username),
    createdAt: new Date().toISOString()
  }
  
  users.push(newUser)
  saveUsers(users)
  setCurrentUser(newUser)
  
  return { success: true, user: newUser }
}

export const loginUser = (email: string, password: string): AuthResult => {
  if (!email || !password) {
    return { success: false, error: 'Заполните все поля' }
  }
  
  const users = getUsers()
  const user = users.find(u => u.email === email && u.password === password)
  
  if (user) {
    setCurrentUser(user)

    return { success: true, user }
  }
  
  return { success: false, error: 'Неверный email или пароль' }
}

export const logoutUser = (): void => {
  setCurrentUser(null)
}
