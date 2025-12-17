// ui-library/src/Input/Input.tsx
import React from "react"

import styles from "./Input.module.css"

export interface InputProps {
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  error?: boolean         
  id?: string               
}

export const Input = (props: InputProps) => {
  const { 
    type = 'text', 
    placeholder, 
    value, 
    onChange, 
    disabled = false,
    error = false,         
    id                     
  } = props

  return (
    <input
      id={id}              
      type={type}
      className={`${styles.input} ${error ? styles.error : ''}`} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  )
}