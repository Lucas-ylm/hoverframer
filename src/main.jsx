import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18+ import
import App from './App';
import './style.scss';

const wrapper = document.querySelector('.l-wrapper');

const root = ReactDOM.createRoot(wrapper);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
