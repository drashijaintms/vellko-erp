import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

const container = document.getElementById('root')

if (container && container.hasChildNodes()) {
  hydrateRoot(
    container,
    <StrictMode>
      <App />
    </StrictMode>
  )
} else if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
