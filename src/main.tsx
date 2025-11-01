import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './context/authentication'
import jwtInterceptor from './utils/jwtInterceptor'

// เรียกใช้ jwtInterceptor ก่อนที่แอปจะเริ่มทำงาน
jwtInterceptor();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

