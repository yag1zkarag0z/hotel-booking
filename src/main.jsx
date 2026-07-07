import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/react'
import './index.css'
import App from './App.jsx'
import { BookingProvider } from './context/BookingContext.jsx'


createRoot(document.getElementById('root')).render(
     <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
       <BrowserRouter>
         <BookingProvider>
           <App />
         </BookingProvider>
       </BrowserRouter>
     </ClerkProvider>
)
