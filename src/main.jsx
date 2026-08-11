import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Toaster
      position='top-right'
      toastOptions={{
        style: {
          fontSize: '14px',
          fontWeight: '400',
        },
      }}
    />
    <App />
  </AuthProvider>
)
