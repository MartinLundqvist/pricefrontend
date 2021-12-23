import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BasketProvider } from './contexts/BasketProvider';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BasketProvider>
      <App />
    </BasketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
