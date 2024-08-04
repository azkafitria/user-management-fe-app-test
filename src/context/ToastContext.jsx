import { createContext } from 'react';

export const ToastContext = createContext({
  toast: {
    text: '',
    isError: false,
    show: false
  },
  setToast: () => {}
});
