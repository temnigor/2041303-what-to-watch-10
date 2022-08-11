import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Film } from '../types/film';

export const mainFilterChang = createAction<string>('main/changFilter');
export const loadFilms = createAction <Film[]> ('data/loadFilms');
export const requireAuthorizationStatus = createAction<AuthorizationStatus>('user/requireAuthorizationStatus');
export const setErrorLoginAction = createAction<boolean>('user/AuthError');
export const loadingPageAction = createAction<boolean>('data/loadSpinier');
export const getUserNameAction = createAction<string>('user/name');
export const loadOneFilm = createAction<Film> ('data/loadOneFilm');
export const loadSimilarFilms = createAction<Film[]> ('data/loadSimilarFilms');
