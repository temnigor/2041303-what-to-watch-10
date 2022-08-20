import { configureStore, createStore} from '@reduxjs/toolkit';
import { rootReducer} from './root-reducer';
import { createApi } from '../api';


export const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk:{
        extraArgument: api,
      },
    },
    )
});

