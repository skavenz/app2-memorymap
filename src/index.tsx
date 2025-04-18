import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/tailwind.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find root element');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
