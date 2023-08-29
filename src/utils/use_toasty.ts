import { toast as toasty, ToastOptions } from 'react-toastify'

export const useToasty = () => {
  const toast = (text: string, options: ToastOptions) => {
    toasty(text, {
      theme: 'colored',
      position: 'top-right',
      autoClose: 5000,
      ...options
    })
  }

  return { toast }
}