import React, { useState } from 'react'

import ReactQuill from 'react-quill-new'

import 'react-quill-new/dist/quill.snow.css'
import styles from './TextArea.module.css'

export interface TextAreaProps {
  placeholder?: string
  value?: string
  rows?: number
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
  wysiwyg?: boolean 
  toolbar?: Array<string | Array<string | object>> 
}

const Modules = {
  toolbar: [
    [{ 'header': '1'}, { 'header': '2'}, { 'header': '3'}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }],     
    ['link', 'image'],                                         
    ['clean']                                        
  ]
}

const Formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list',
  'link', 'image'
]

export const TextArea = (props: TextAreaProps) => {
  const { 
    placeholder, 
    value = '', 
    rows = 4, 
    onChange, 
    disabled = false,
    wysiwyg = false,
    toolbar = Modules.toolbar
  } = props

  const [isFocused, setIsFocused] = useState(false)
  
  const minHeight = Math.max(150, rows * 24) 

  const handleSimpleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e)
    }
  }

  const handleWysiwygChange = (content: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: {
          value: content,
          name: 'content',
          type: 'textarea'
        }
      } as React.ChangeEvent<HTMLTextAreaElement>
      
      onChange(syntheticEvent)
    }
  }

  if (!wysiwyg) {
    return (
      <textarea
        className={styles.textarea}
        placeholder={placeholder}
        value={value}
        rows={rows}
        onChange={handleSimpleChange}
        disabled={disabled}
        style={{ minHeight: `${rows * 24}px` }}
      />
    )
  }

  return (
    <div className={`${styles.wysiwygContainer} ${disabled ? styles.disabled : ''}`}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleWysiwygChange}
        placeholder={placeholder}
        modules={{ toolbar }}
        formats={Formats}
        readOnly={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`${styles.wysiwygEditor} ${isFocused ? styles.focused : ''}`}
        style={{ minHeight: `${minHeight}px` }}
      />
    </div>
  )
}