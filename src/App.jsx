import { useEffect, useState } from 'react';
import './App.css';
import { ToastContext } from './context/ToastContext';
import Home from './components/pages/Home';
import Toast from './components/commons/Toast';

function App() {
  const [toast, setToast] = useState({
    text: '',
    isError: false,
    show: false
  });

  useEffect(() => {
    if (toast.show) {
      const toRef = setTimeout(() => {
        setToast({ ...toast, show: false });
        clearTimeout(toRef);
      }, 3000);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      <Home />
      {toast.show && <Toast text={toast.text} isError={toast.isError} />}
    </ToastContext.Provider>
  );
}

export default App;
