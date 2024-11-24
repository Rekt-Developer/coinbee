import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './Providers/ThemeProvider.tsx';
import './index.scss';
import { CookiesProvider } from 'react-cookie'
import { Account } from './components/Account/Account.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider>
    <BrowserRouter>
      <ThemeProvider>
        <Account/>
      </ThemeProvider>
    </BrowserRouter>
    </CookiesProvider>
    
  </React.StrictMode>
);
