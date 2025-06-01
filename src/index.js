import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import App from './js/App';
import registerServiceWorker from './js/registerServiceWorker';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
    <App />
);

registerServiceWorker();
