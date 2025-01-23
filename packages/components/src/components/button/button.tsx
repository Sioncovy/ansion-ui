// src/Button/index.tsx
import { FC } from 'react'
import styles from './styles.module.scss'

interface ButtonProps {
  children: React.ReactNode
}

export const Button: FC<ButtonProps> = ({ children }) => {
  return (
    <button
      className={styles.button}
      onClick={() => {
        console.log('点击事件222')
      }}
    >
      {children}
    </button>
  )
}
