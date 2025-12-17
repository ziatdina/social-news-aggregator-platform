export const STORAGE_KEYS = {
  USERS: 'all-users',
  CURRENT_USER: 'current-user',
  POSTS: 'posts'
}

export interface StorageService {
    get: <T>(key: string) => T | null
    set: <T>(key: string, value: T) => void
    remove: (key: string) => void
    clear: () => void
}

export const storage: StorageService = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key)

      if (!item) { return null }

      return JSON.parse(item)
    }
    catch (error) {
      console.error(`Ошибка при чтении ${key} из localStorage:`, error)

      return null
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      const item = JSON.stringify(value)

      localStorage.setItem(key, item)
    }
    catch (error) {
      console.error(`Ошибка при сохранении ${key} в localStorage:`, error)
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key)
  },

  clear: (): void => {
    localStorage.clear()
  }
}