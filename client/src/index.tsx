import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import './app/layout/styles.css'
import { StoreProvider } from './app/context/StoreContext';
import { createBrowserHistory } from "history";
import { BrowserRouter, Router } from 'react-router-dom';

export const _history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
