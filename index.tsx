import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initSystemInterceptor } from './utils/systemInterceptor';
import { initAppLifecycle } from './utils/appLifecycle';
import { preloadLocalAssets, scheduleIdlePreload } from './utils/preloadResources';

// Production: keep console.error, mute noisier console methods.
if (!import.meta.env.DEV) {
  const noop = () => {};
  console.log = noop;
  console.warn = noop;
  console.debug = noop;
  console.info = noop;
}

// Initialize global interceptors before React mounts.
initSystemInterceptor();

// Initialize app lifecycle recovery hooks.
initAppLifecycle();

// Preload lightweight local assets before React mounts.
preloadLocalAssets();

// Queue non-critical remote preloads for idle time.
scheduleIdlePreload();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
