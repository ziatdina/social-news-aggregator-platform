import React from "react"

import styles from './Button.module.css'

export interface ButtonProps {
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'large' | 'medium' | 'small'
  children?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

export const Button = (props: ButtonProps) => {
  const { type = 'button', variant = 'primary', size = 'medium', children, disabled = false, onClick } = props

  return (
    <button 
      type={type}
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
