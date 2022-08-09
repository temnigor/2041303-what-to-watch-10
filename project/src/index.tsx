import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
import { checkAutAction, fetchFilmsActions } from './store/api-action';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
store.dispatch(fetchFilmsActions());
store.dispatch(checkAutAction());

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
