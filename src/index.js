import React from 'react';
// import { hydrate, render } from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18';
import { HelmetProvider } from 'react-helmet-async';

// const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <HelmetProvider>
    <App />
  </HelmetProvider>
  // </React.StrictMode>
);
