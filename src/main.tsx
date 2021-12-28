import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BasketProvider } from './contexts/BasketProvider';
import { SearchProvider } from './contexts/SearchProvider';
import { AlertProvider } from './contexts/AlertProvider';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BasketProvider>
      <SearchProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </SearchProvider>
    </BasketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
