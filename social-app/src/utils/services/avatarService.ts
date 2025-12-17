import { type User } from "../types"

const colors = [
  '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2',
  '#ef479bff', '#7209B7', '#3A86FF', '#FB5607', '#8338EC'
]

export interface AvatarData {
  initials: string;
  color: string;
}

const getInitials = (username: string): string => {
  const trimName = username.trim()

  if (!trimName) { return '??'}

  const words = trimName.split(/\s+/)

  if (words.length >= 2) {
    const firstLetter = words[0][0]
    const secondLetter = words[1][0]

    return (firstLetter + secondLetter).toUpperCase()
  }

  return trimName.substring(0, 2).toUpperCase()
}

const getColor = (): string => {
  const randomIndex = Math.floor(Math.random() * colors.length)

  return colors[randomIndex]
}

export const createAvatar = (username: string): string => {
  const initials = getInitials(username)
  const color = getColor()

  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="${color}"/>
    <text x="50" y="50" text-anchor="middle" dy="0.35em" 
            fill="white" font-size="40" font-family="Arial, sans-serif">
        ${initials}
    </text>
    </svg>`

  const avatarUrl = encodeURIComponent(svg)

  return `data:image/svg+xml,${avatarUrl}`
}

export const getAvatar = (user: User): string => {
  if (user.avatar) { return user.avatar }

  return createAvatar(user.username)
}
