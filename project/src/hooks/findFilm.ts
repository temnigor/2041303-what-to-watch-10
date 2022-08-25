import { useAppSelector } from '.';
import { getOpenedFilms, getPromoFilm } from '../store/data-api-process/selectors';
import { Film } from '../types/film';

export const useFindFilm = (isPromo:boolean):Film | undefined =>{
  const promoFilm = useAppSelector(getPromoFilm);
  const openFilm = useAppSelector(getOpenedFilms);
  if(isPromo){
    if(promoFilm !== undefined){
      return promoFilm;
    }
  }
  if(openFilm !== undefined){
    return openFilm;
  }
};
