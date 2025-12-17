import { getCurrentUser } from './authService'
import { getAvatar } from './avatarService'
import { storage, STORAGE_KEYS } from './localStorageService'

import type { Post } from '../types/Post'

export const postService = {
  getAllPosts: (): Post[] => {
    try {
      const posts = storage.get<Post[]>(STORAGE_KEYS.POSTS) || []

      return posts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    } catch (error) {
      console.error('Ошибка загрузки постов:', error)

      return []
    }
  },

  createPost: (content: string) => {
    const user = getCurrentUser()

    if (!user) {
      return { success: false, error: 'Войдите в аккаунт' }
    }
    
    if (!content.trim()) {
      return { success: false, error: 'Пост не может быть пустым' }
    }

    try {
      const posts = postService.getAllPosts()
      
      const newPost: Post = {
        id: `post_${Date.now()}`,
        avatar: getAvatar(user),
        authorId: user.id,
        authorName: user.username,
        content: content.trim(),
        createdAt: new Date().toISOString(),
        likes: []
      }

      posts.unshift(newPost)
      storage.set(STORAGE_KEYS.POSTS, posts)

      return { success: true, post: newPost }
    } catch (error) {
      console.error('Ошибка создания поста:', error)

      return { success: false, error: 'Ошибка при создании' }
    }
  },

  toggleLike: (postId: string) => {
    const user = getCurrentUser()

    if (!user) {
      return { success: false, likesCount: 0, isLiked: false }
    }

    try {
      const posts = postService.getAllPosts()
      
      const postIndex = posts.findIndex(post => post.id === postId)
      
      if (postIndex === -1) {
        return { success: false, likesCount: 0, isLiked: false }
      }

      const post = posts[postIndex]
      const userId = user.id
      
      const isCurrentlyLiked = post.likes.includes(userId)
      
      if (isCurrentlyLiked) {
        post.likes = post.likes.filter(id => id !== userId)
      } else {
        post.likes = [...post.likes, userId]
      }
      
      storage.set(STORAGE_KEYS.POSTS, posts)
      
      return {
        success: true,
        likesCount: post.likes.length, 
        isLiked: !isCurrentlyLiked 
      }
    } catch (error) {
      console.error('Ошибка лайка:', error)

      return { success: false, likesCount: 0, isLiked: false }
    }
  }
}