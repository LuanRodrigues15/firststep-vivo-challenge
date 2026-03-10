import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom' 
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './hooks/use-theme.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>,
)