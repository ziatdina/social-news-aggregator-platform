import React from "react"

import styles from "./Input.module.css"

export interface InputProps {
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean 
}

export const Input = (props: InputProps) => {
  const { type = 'text', placeholder, value, onChange, disabled = false } = props

  return (
    <input
      type={type}
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  )
}