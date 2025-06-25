import React from 'react';
import ReactDOM from 'react-dom/client';
import './lib/grapesjs-global'; // Import early to make grapesjs globally available
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);