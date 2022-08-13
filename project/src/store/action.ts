import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Film } from '../types/film';
import { Review } from '../types/review';

export const mainFilterChangAction = createAction<string>('main/changFilter');
export const filmFilterCountAction = createAction<number>('main/FilmCount');
export const loadFilms = createAction <Film[]> ('data/loadFilms');
export const requireAuthorizationStatus = createAction<AuthorizationStatus>('user/requireAuthorizationStatus');
export const setErrorLoginAction = createAction<boolean>('user/AuthError');
export const loadingPageAction = createAction<boolean>('data/loadSpinier');
export const getUserNameAction = createAction<string>('user/name');
export const loadOpenFilm = createAction<Film> ('data/loadOpenFilm');
export const loadSimilarFilms = createAction<Film[]> ('data/loadSimilarFilms');
export const loadReviews = createAction<Review[]> ('data/LoadReviews');
export const isErrorResponseAction = createAction<boolean> ('data/loadingError');
