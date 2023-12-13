import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from "./context/userContext";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { NotifiProvider } from './components/notify/notify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <NotifiProvider>
          <App />
        </NotifiProvider>j
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
