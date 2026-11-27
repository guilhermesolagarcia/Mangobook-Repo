import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@phosphor-icons/web/light';
import '@phosphor-icons/web/fill';
import './marca/marca.css';
import './base.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>);
