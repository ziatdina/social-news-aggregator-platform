import { useState } from 'react'

import { Tabs, Tab, Box, Alert, CircularProgress } from '@mui/material' 
import { useNavigate } from 'react-router-dom'

import styles from './AuthForm.module.css'
import { Button, Input } from '../../../../ui-library/src'
import { useAuth } from '../../utils/contexts'
import { useForm } from '../../utils/hooks'

export const AuthForm = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [generalError, setGeneralError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const loginForm = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validationRules: {
      email: { 
        required: true, 
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      },
      password: { 
        required: true, 
        minLength: 6 
      }
    },
    onSubmit: async (values) => {
      setGeneralError('')
      setIsLoading(true)
      
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        const result = await login(values.email, values.password)
        
        if (!result.success) {
          setGeneralError(result.error || 'Ошибка входа')
        } else {
          await new Promise(resolve => setTimeout(resolve, 400))
          navigate('/')
        }
      } catch {
        setGeneralError('Произошла непредвиденная ошибка')
      } finally {
        setIsLoading(false)
      }
    }
  })

  const registerForm = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationRules: {
      username: { 
        required: true, 
        minLength: 3,
        maxLength: 20 
      },
      email: { 
        required: true, 
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      },
      password: { 
        required: true, 
        minLength: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/
      },
      confirmPassword: {
        required: true,
        custom: (value) => 
          value !== registerForm.values.password 
            ? 'Пароли не совпадают' 
            : undefined
      }
    },
    onSubmit: async (values) => {
      setGeneralError('')
      setIsLoading(true)
      
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        const result = await register(
          values.email,
          values.username,
          values.password
        )
        
        if (!result.success) {
          setGeneralError(result.error || 'Ошибка регистрации')
        } else {
          await new Promise(resolve => setTimeout(resolve, 400))
          navigate('/')
        }
      } catch {
        setGeneralError('Произошла непредвиденная ошибка')
      } finally {
        setIsLoading(false)
      }
    }
  })

  const currentForm = activeTab === 0 ? loginForm : registerForm

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (isLoading) return
    setActiveTab(newValue)
    setGeneralError('')
    currentForm.setValues({
      ...currentForm.values,
      email: '',
      password: '',
      ...(newValue === 1 ? { username: '', confirmPassword: '' } : {})
    })
  }

  const createChangeHandler = (fieldName: string) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isLoading) return
      currentForm.handleChange(fieldName, e.target.value)
      if (generalError) setGeneralError('')
    }

  return (
    <div className={`${styles.authForm} ${isLoading ? styles.disabled : ''}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Добро пожаловать!</h1>
        <p className={styles.subtitle}>Социальная платформа</p>
      </div>

      <Box className={styles.tabsContainer}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          className={styles.tabs}
          classes={{
            indicator: styles.tabsIndicator,
            flexContainer: styles.tabsFlexContainer
          }}
        >
          <Tab 
            label={
              <span className={styles.tabLabel}>
                Вход
              </span>
            }
            disabled={isLoading}
            className={styles.tab}
            classes={{
              selected: styles.tabSelected
            }}
          />
          <Tab 
            label={
              <span className={styles.tabLabel}>
                Регистрация
              </span>
            }
            disabled={isLoading}
            className={styles.tab}
            classes={{
              selected: styles.tabSelected
            }}
          />
        </Tabs>
      </Box>

      {generalError && (
        <Alert 
          severity="error" 
          className={styles.alert}
          onClose={() => setGeneralError('')}
        >
          {generalError}
        </Alert>
      )}

      <form onSubmit={currentForm.handleSubmit} className={styles.form}>
        {activeTab === 1 && (
          <div className={styles.formGroup}>
            <label className={styles.label}>Имя пользователя</label>
            <Input
              type="text"
              id="text"
              value={currentForm.values.username}
              onChange={createChangeHandler('username')}
              error={!!currentForm.errors.username}
              disabled={isLoading}
              placeholder="Имя"
            />
            {currentForm.errors.username && (
              <span className={styles.errorText}>{currentForm.errors.username}</span>
            )}
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <Input
            type="email"
            id="email"
            value={currentForm.values.email}
            onChange={createChangeHandler('email')}
            error={!!currentForm.errors.email}
            disabled={isLoading}
            placeholder="Почта"
          />
          {currentForm.errors.email && (
            <span className={styles.errorText}>{currentForm.errors.email}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Пароль
          </label>
          <Input
            type="password"
            id="password"
            value={currentForm.values.password}
            onChange={createChangeHandler('password')}
            error={!!currentForm.errors.password}
            disabled={isLoading}
            placeholder={activeTab === 0 ? "Ваш пароль" : "Создайте пароль"}
          />
          {currentForm.errors.password && (
            <span className={styles.errorText}>{currentForm.errors.password}</span>
          )}
        </div>

        {activeTab === 1 && (
          <div className={styles.formGroup}>
            <label className={styles.label}>Подтвердите пароль</label>
            <Input
              type="password"
              id="password"
              value={currentForm.values.confirmPassword}
              onChange={createChangeHandler('confirmPassword')}
              error={!!currentForm.errors.confirmPassword}
              disabled={isLoading}
              placeholder="Повторите пароль"
            />
            {currentForm.errors.confirmPassword && (
              <span className={styles.errorText}>{currentForm.errors.confirmPassword}</span>
            )}
          </div>
        )}
        <div className={styles.button}>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            size='medium'
          >
            {isLoading ? (
              <>
                <CircularProgress 
                  size={16} 
                  className={styles.buttonSpinner}
                />
                {activeTab === 0 ? 'Вход...' : 'Регистрация...'}
              </>
            ) : (
              activeTab === 0 ? 'Войти' : 'Зарегистрироваться'
            )}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/')} 
            disabled={isLoading}
          >
          Войти как гость
          </Button>
        </div>
      </form>
    </div>
  )
}