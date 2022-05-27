import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

if (process.env.NODE_ENV !== 'production') {
  console.log('App running in development mode.');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
