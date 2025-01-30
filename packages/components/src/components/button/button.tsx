// src/Button/index.tsx
import { ButtonHTMLAttributes, FC } from 'react'
import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button: FC<ButtonProps> = ({ children, ...rawProps }) => {
  return (
    <button className={styles.button} {...rawProps}>
      {children}
    </button>
  )
}
