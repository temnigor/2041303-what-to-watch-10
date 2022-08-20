import { useEffect } from 'react';
import { CatalogFilm, FilterMainNavMenu, GenresFilter } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllFilms, getSimilarFilms } from '../../store/data-api-process/selectors';
import { filmFilterCountAction } from '../../store/main-genre-filter-process/main-genre-filter-process';
import { getFilmFilterCount, getFilter } from '../../store/main-genre-filter-process/selectors';
import { Film } from '../../types/film';
import { CatalogFilmCards } from './catalog-film-cards';
const FILM_CARD_COUNT = 4;

type CatalogFilmCardsInterfaceProps = {
  catalogFilter:string,
  sliceEnd?: number
}

export function CatalogFilmCardsInterface ({catalogFilter: CatalogFilter, sliceEnd}:CatalogFilmCardsInterfaceProps):JSX.Element {
  const filter = useAppSelector(getFilter);
  const allFilms = useAppSelector(getAllFilms);
  const similarFilms = useAppSelector(getSimilarFilms);
  const filmFilterCount = useAppSelector(getFilmFilterCount);

  const dispatch = useAppDispatch();
  let filmsFiltered = allFilms;
  let filmsFavoriteFiltered = allFilms;
  useEffect(()=>{
    if(filmsFiltered.length !== filmFilterCount){
      dispatch(filmFilterCountAction(filmsFiltered.length));
    }
  }, [dispatch,filter,filmsFiltered.length, filmFilterCount]
  );

  switch(CatalogFilter) {
    case CatalogFilm.GENRE_FILTER:
      if(sliceEnd === undefined){
        break;
      }
      if(filter !== GenresFilter[FilterMainNavMenu.ALL_GENRES]){
        filmsFiltered = filmsFiltered.filter((film:Film)=>film.genre === filter);
      }
      return filmsFiltered.length === 0 ? (<div className ="catalog__films-list"> No film Genre {filter}</div>
      ) : (
        <CatalogFilmCards films={filmsFiltered} sliceEnd={sliceEnd}/>
      );

    case CatalogFilm.SIMILAR_FILTER:
      return <CatalogFilmCards films={similarFilms} sliceEnd={FILM_CARD_COUNT} />;

    case CatalogFilm.FAVORITE_FILTER:
      filmsFavoriteFiltered = filmsFavoriteFiltered.filter((film)=>film.isFavorite);
      return <CatalogFilmCards films={filmsFavoriteFiltered} sliceEnd={filmsFavoriteFiltered.length} />;
  }
  return <p>No film </p>;
}
