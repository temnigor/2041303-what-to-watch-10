import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Film } from '../types/film';

export const mainFilterChang = createAction<string>('main/changFilter');
export const loadFilm = createAction <Film[]> ('data/loadFilms');
export const requireAuthorizationStatus = createAction<AuthorizationStatus>('user/requireAuthorizationStatus');
export const setErrorLoginAction = createAction<boolean>('user/AuthError');
export const setLoadingFilmsAction = createAction<boolean>('data/loadSpinier');
export const getUserNameAction = createAction<string>('user/name');
