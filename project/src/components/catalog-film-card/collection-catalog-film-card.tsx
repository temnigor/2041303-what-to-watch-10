import { useEffect } from 'react';
import { ALL_GENRE, CatalogFilm } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllFilms, getFavoriteFilms, getSimilarFilms } from '../../store/data-api-process/selectors';
import { filmFilterCountAction } from '../../store/filter-process/filter-process';
import { getFilmFilterCount, getFilter } from '../../store/filter-process/selectors';
import { Film } from '../../types/film';
import { CatalogFilmCards } from './catalog-film-cards';
const FILM_CARD_COUNT = 4;

type CollectionFilmCardCatalogProps = {
  catalogFilter:string,
  sliceEnd?: number
}

export function CollectionFilmCardCatalog ({catalogFilter: CatalogFilter, sliceEnd}:CollectionFilmCardCatalogProps):JSX.Element {
  const filter = useAppSelector(getFilter);
  const allFilms = useAppSelector(getAllFilms);
  const similarFilms = useAppSelector(getSimilarFilms);
  const filmFilterCount = useAppSelector(getFilmFilterCount);
  const favoriteFilms = useAppSelector(getFavoriteFilms);

  const dispatch = useAppDispatch();
  let filmsFiltered = allFilms;

  useEffect(()=>{
    if(filmsFiltered.length !== filmFilterCount){
      dispatch(filmFilterCountAction(filmsFiltered.length));
    }
  }, [dispatch,filter,filmsFiltered.length, filmFilterCount]
  );

  switch(CatalogFilter) {
    case CatalogFilm.GenreFilter:
      if(sliceEnd === undefined){
        break;
      }
      if(filter !== ALL_GENRE){
        filmsFiltered = filmsFiltered.filter((film:Film)=>film.genre === filter);
      }
      return filmsFiltered.length === 0 ? (<div className ="catalog__films-list"> No film Genre {filter}</div>
      ) : (
        <CatalogFilmCards films={filmsFiltered} sliceEnd={sliceEnd}/>
      );

    case CatalogFilm.SimilarFilter:
      return <CatalogFilmCards films={similarFilms} sliceEnd={FILM_CARD_COUNT} />;

    case CatalogFilm.FavoriteFilter:
      return <CatalogFilmCards films={favoriteFilms} sliceEnd={favoriteFilms.length} />;
  }
  return <p>No film </p>;
}
