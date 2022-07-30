import { configureStore } from '@reduxjs/toolkit';
import { reducerMainFilterFilm } from './reducer';

export const store = configureStore({reducer:reducerMainFilterFilm});

