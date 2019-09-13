import React from 'react'

declare module 'react' {
  interface ImgHTMLAttributes<T> {
    loading?: 'lazy' | 'eager' | 'auto'
  }
}
