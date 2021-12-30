import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BasketProvider } from './contexts/BasketProvider';
import { SearchProvider } from './contexts/SearchProvider';
import { AlertProvider } from './contexts/AlertProvider';
import App from './App';
import { NavigationProvider } from './contexts/NavigationProvider';

ReactDOM.render(
  <React.StrictMode>
    <BasketProvider>
      <SearchProvider>
        <NavigationProvider>
          <AlertProvider>
            <App />
          </AlertProvider>
        </NavigationProvider>
      </SearchProvider>
    </BasketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
