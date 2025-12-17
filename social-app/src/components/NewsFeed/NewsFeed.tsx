import { useState, useEffect, useMemo } from 'react'

import { Snackbar, Alert, CircularProgress } from '@mui/material'
import { NewsCard } from '@my-app/ui-library'

import styles from './NewsFeed.module.css'
import { useAuth } from '../../utils/contexts'
import { usePosts } from '../../utils/hooks'
import { useSearch } from '../../utils/hooks' 

export const NewsFeed = () => {
  const { posts, isLoading, toggleLike, loadPosts } = usePosts()
  const { isAuthenticated, user } = useAuth()
  const { searchQuery } = useSearch()
  
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null)

  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const refreshPosts = () => {
      if (loadPosts) {
        loadPosts()
      }
    }

    window.addEventListener('postCreated', refreshPosts)

    return () => { window.removeEventListener('postCreated', refreshPosts) }
  }, [loadPosts])

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return posts
    }

    const query = searchQuery.toLowerCase().trim()
    
    return posts.filter(post => {
      const contentWithoutTags = post.content.replace(/<[^>]*>/g, '').toLowerCase()
      const contentMatch = contentWithoutTags.includes(query)
      const authorMatch = post.authorName.toLowerCase().includes(query)

      return contentMatch || authorMatch
    })
  }, [posts, searchQuery])

  const handleLikeToggle = async (postId: string) => {
    if (!isAuthenticated || !user) {
      setAuthError('Войдите в систему, чтобы ставить лайки')
 
      return
    }

    await toggleLike(postId)
  }

  const handleToggleExpand = (postId: string) => {
    setExpandedPostId(expandedPostId === postId ? null : postId)
  }

  const handleCloseError = () => {
    setAuthError(null)
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress />
        <p className={styles.loadingText}>Загружаем ленту...</p>
      </div>
    )
  }

  if (searchQuery.trim() && filteredPosts.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h3 className={styles.emptyTitle}>Ничего не найдено</h3>
        <p className={styles.emptyText}>
          По запросу "{searchQuery}" постов не найдено
        </p>
      </div>
    )
  }

  if (filteredPosts.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h3 className={styles.emptyTitle}>Лента новостей пуста</h3>
        <p className={styles.emptyText}>Будьте первым, кто поделится новостью!</p>
      </div>
    )
  }

  return (
    <div className={styles.newsFeed}>
      <div className={styles.feedContainer}>
        {filteredPosts.map(post => {
          const isLiked = user ? post.likes.includes(user.id) : false
          const isExpanded = expandedPostId === post.id
          
          return (
            <div key={post.id}>
              <NewsCard
                profPhoto={post.avatar}
                author={post.authorName}
                date={new Date(post.createdAt)}
                content={post.content}
                pictures={[]} 
                likes={post.likes.length}
                isLike={isLiked}
                isExpanded={isExpanded}
                onToggle={() => handleToggleExpand(post.id)}
                onLikeToggle={() => handleLikeToggle(post.id)}
                dangerouslyRenderHTML={true}
              />
            </div>
          )
        })}
      </div>

      <Snackbar
        open={!!authError} 
        autoHideDuration={3000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseError} 
          severity="info" 
          className={styles.snackbarAlert}
        >
          {authError}
        </Alert>
      </Snackbar>
    </div>
  )
}