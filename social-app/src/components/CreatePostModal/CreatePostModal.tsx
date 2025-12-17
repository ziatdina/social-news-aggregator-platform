import React, { useState } from 'react'

import { Close as CloseIcon } from '@mui/icons-material'
import { Modal, Box, Alert, CircularProgress } from '@mui/material'
import { TextArea } from '@my-app/ui-library'
import { Button } from '@my-app/ui-library'

import styles from './CreatePostModal.module.css'
import { useAuth } from '../../utils/contexts'
import { usePosts } from '../../utils/hooks'

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [postContent, setPostContent] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { createPost } = usePosts()
  const { user } = useAuth()

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value)
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleSubmit = async () => {
    const plainText = postContent.replace(/<[^>]*>/g, '').trim()
    
    if (!plainText) {
      setError('Пост не может быть пустым')

      return
    }

    if (!user) {
      setError('Для создания поста необходимо войти в систему')

      return
    }

    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const result = await createPost(postContent)
      
      if (result.success) {
        setSuccess('Пост успешно опубликован!')
        setTimeout(() => window.dispatchEvent(new Event('postCreated')), 1500)
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setPostContent('')
        onClose()
      } else {
        setError(result.error || 'Ошибка при публикации поста')
      }
    } catch (err) {
      setError('Произошла непредвиденная ошибка')
      console.error('Ошибка создания поста:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (isSubmitting) return
    
    if (postContent.trim()) {
      const plainText = postContent.replace(/<[^>]*>/g, '').trim()

      if (plainText && !window.confirm('У вас есть несохраненные изменения. Закрыть?')) {
        return
      }
    }
    
    setPostContent('')
    setError('')
    setSuccess('')
    onClose()
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="create-post-modal"
      disableEscapeKeyDown={isSubmitting}
    >
      <Box className={styles.modalContainer}>
        <div className={styles.modalTop}>
          <div className={styles.titleSection}>
            <h2 className={styles.modalTitle}>Новый пост</h2>
          </div>
          <button 
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Закрыть"
            disabled={isSubmitting}
            type="button"
          >
            <CloseIcon className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.titleDivider} />

        <div className={styles.modalContent}>
          {error && (
            <Alert 
              severity="error" 
              className={styles.alert}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          {success && (
            <Alert 
              severity="success" 
              className={styles.alert}
              onClose={() => setSuccess('')}
            >
              {success}
            </Alert>
          )}

          <div className={styles.postArea}>
            <TextArea
              placeholder="Что у вас нового?"
              value={postContent}
              onChange={handleContentChange}
              rows={4}
              wysiwyg={true}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button
            type="button"
            variant="primary"
            onClick={handleSubmit}
            disabled={!postContent.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <CircularProgress size={16} className={styles.buttonSpinner} />
                Публикация...
              </>
            ) : (
              'Опубликовать'
            )}
          </Button>
        </div>
      </Box>
    </Modal>
  )
}