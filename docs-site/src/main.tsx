import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import 'prima-ui/styles.css';
import { App } from './App';
import { initGoogleAnalytics } from './analytics/ga';

initGoogleAnalytics();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
);
