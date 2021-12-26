import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BasketProvider } from './contexts/BasketProvider';
import { SearchProvider } from './contexts/SearchProvider';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BasketProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </BasketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
