"use client"
import React from 'react'
import { ToastProvider } from '@/app/store/toast.store'

const Providers = ({children}) => {
  return (
    <ToastProvider>{children}</ToastProvider>
  )
}

export default Providers