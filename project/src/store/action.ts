import { createAction } from '@reduxjs/toolkit';

export const mainFilterChang = createAction<string>('main/changFilter');

export const getFilmsFromServer = createAction('app/getFilms');
