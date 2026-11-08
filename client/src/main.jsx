import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Empty string = same origin. In dev, vite proxies /api to the Express server.
// In production set VITE_API_URL to your deployed backend, e.g. https://sarat-api.onrender.com
const api = import.meta.env.VITE_API_URL || '';

// Without a backend URL in production, the contact form falls back to "copy message" mode.
createRoot(document.getElementById('root')).render(
  <App api={api || (import.meta.env.DEV ? window.location.origin : '')} />
);
