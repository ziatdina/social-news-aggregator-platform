import { useState } from 'react'

import { Snackbar, Alert } from '@mui/material'
import { Button, Input } from '@my-app/ui-library'
import { useNavigate } from 'react-router-dom'

import styles from './Header.module.css'
import { useAuth } from '../../utils/contexts'
import { useSearch } from '../../utils/hooks'
import { CreatePostModal } from '../CreatePostModal/CreatePostModal'

export const Header = () => {
  const { isAuthenticated } = useAuth()
  
  const { searchQuery, setSearchQuery, clearSearch } = useSearch()
  
  const navigate = useNavigate()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as 'success' | 'error' | 'info' | 'warning'
  })

  const handleLogoClick = () => {
    navigate('/') 
    clearSearch() 
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setSearchQuery(value) 
  }

  const handleCreatePostClick = () => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: 'Войдите в систему, чтобы создавать посты',
        severity: 'info'
      })

      return
    }
    setIsModalOpen(true)
  }

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div 
            className={styles.logo} 
            onClick={handleLogoClick}
          >
            <span className={styles.logoText}>Социальная платформа</span>
          </div>
          
          <div className={styles.controls}>
            <div className={styles.searchContainer}>
              <Input
                type="text"
                id="search"
                placeholder="Поиск..."
                value={searchQuery} 
                onChange={handleSearchChange}
              />
             
            </div>
            
            <Button
              variant="primary"
              onClick={handleCreatePostClick}
            >
              Создать пост
            </Button>
          </div>
        </div>
      </header>

      {isAuthenticated && (
        <CreatePostModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          className={styles.snackbarAlert}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}