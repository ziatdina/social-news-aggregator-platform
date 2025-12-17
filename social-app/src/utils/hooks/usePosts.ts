import { useState, useCallback, useEffect } from 'react'

import { useAuth } from '../contexts/AuthContext'
import { postService } from '../services/postService'

import type { Post } from '../types/Post' 

interface UsePostsProps {
  posts: Post[]
  isLoading: boolean
  loadPosts: () => void
  createPost: (content: string) => ReturnType<typeof postService.createPost>
  toggleLike: (postId: string) => ReturnType<typeof postService.toggleLike>
}

export const usePosts = (): UsePostsProps => {
  const { user } = useAuth()
  
  const [posts, setPosts] = useState<Post[]>([]) 
  const [isLoading, setIsLoading] = useState(true)

  const loadPosts = useCallback(() => {
    setIsLoading(true)

    try {
      const allPosts = postService.getAllPosts()

      setPosts(allPosts) 
    } catch (err) {
      console.error('Ошибка:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const createPost = useCallback((content: string) => {
    if (!user) {
      return { success: false, error: 'Войдите в аккаунт' }
    }
    
    const result = postService.createPost(content)

    if (result.success) {
      loadPosts()
    }

    return result
  }, [user, loadPosts])

  const toggleLike = useCallback((postId: string) => {
    if (!user) {
      return { 
        success: false, 
        likesCount: 0, 
        isLiked: false,
        error: 'Войдите, чтобы ставить лайки' 
      }
    }
    
    const result = postService.toggleLike(postId)
    
    if (result.success) {
      setPosts(prev => 
        prev.map(post => {
          if (post.id === postId) {
            const updatedPost: Post = {
              ...post,
              likes: result.isLiked 
                ? [...post.likes, user.id] 
                : post.likes.filter(id => id !== user.id) 
            }

            return updatedPost
          }

          return post
        })
      )
    }
    
    return result
  }, [user])

  return {
    posts,
    isLoading,
    loadPosts,
    createPost,
    toggleLike
  }
}