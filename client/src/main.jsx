import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App'; 
import './index.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <React.StrictMode> 
    <App />
    <Toaster /> {/* Toaster for notifications */}
  </React.StrictMode>,
  document.getElementById('root')
);