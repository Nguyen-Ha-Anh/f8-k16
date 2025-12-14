import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MountUnMount from './MountUnMount.jsx'
import FetchAPI from './FetchAPI.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FetchAPI/>
  </StrictMode>,
)
