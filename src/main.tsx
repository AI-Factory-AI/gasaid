import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize theme
function initializeTheme() {
  const theme = localStorage.getItem('theme') || 'system'
  const root = document.documentElement
  
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    root.classList.add(systemTheme)
  } else {
    root.classList.add(theme)
  }
}

// Initialize theme before rendering
initializeTheme()

createRoot(document.getElementById("root")!).render(<App />);
