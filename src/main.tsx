import React from 'react';
import ReactDOM from 'react-dom/client';
//import { BrowserRouter as Router } from 'react-router-dom';
import { HashRouter  as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';

import { HelmetProvider } from 'react-helmet-async';

//import './css/satoshi.css';
//import 'jsvectormap/dist/css/jsvectormap.css';
//import 'flatpickr/dist/flatpickr.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Router basename="/REACT_SERDAL">
      <App />
    </Router> */}

    <Router>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Router>
  </React.StrictMode>,
);
