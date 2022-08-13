import { configureStore} from '@reduxjs/toolkit';
import { reducerMainFilterFilm } from './reducer';
import { createApi } from '../api';

export const api = createApi();

export const store = configureStore({
  reducer: reducerMainFilterFilm,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk:{
        extraArgument: api,
      },
    }),
});

