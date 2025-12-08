import React from "react"

import styles from './TextArea.module.css'

export interface TextAreaProps {
  placeholder?: string
  value?: string
  rows?: number
  onChange?: (e:React.ChangeEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
}

export const TextArea = (props: TextAreaProps) => {
  const { placeholder, value, rows = 2, onChange, disabled = false} = props

  return(
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      value={value}
      rows={rows}
      onChange={onChange}
      disabled={disabled}
    />
  )
}