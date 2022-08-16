import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
import { loadingPageAction } from './store/action';
import { checkAutAction, fetchFavoriteFilmAction, fetchFilmsActions} from './store/api-action';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(loadingPageAction(true));
store.dispatch(fetchFilmsActions());
store.dispatch(fetchFavoriteFilmAction());
store.dispatch(checkAutAction());
store.dispatch(loadingPageAction(false));

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
