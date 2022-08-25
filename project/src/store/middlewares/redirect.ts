import { Middleware } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<undefined, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'redirect') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
