import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Context from './components/Context.tsx'
import { BrowserRouter } from 'react-router-dom'
import "tw-elements-react/dist/css/tw-elements-react.min.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Context>
    <App/>
    </Context>
    </BrowserRouter>
  </React.StrictMode>,
)
