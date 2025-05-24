import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CarrelloProvider } from './context/CarrelloContext';

import { Provider } from 'react-redux';
import store from './store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CarrelloProvider>
        <App />
      </CarrelloProvider>
    </Provider>
  </StrictMode>
);