import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeStore } from 'fluxible-js';

function getInitialStore() {
  return {
    user: null
  };
}

initializeStore({
  initialStore: getInitialStore(),
  persist: {
    useJSON: false,
    syncStorage: window.localStorage,
    restore: savedStore => ({
      user: savedStore.user
    })
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
