import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n' // Initialiser i18n
import App from './App.tsx'
import { addPreloadLinks } from './utils/preloadImages'

// Preload images immediately on app start - even before React renders
addPreloadLinks();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
