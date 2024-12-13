import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import RootProvider from "./context";

window.addEventListener('load', () => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <RootProvider>
                <App />
            </RootProvider>
        </StrictMode>,
    )
})
