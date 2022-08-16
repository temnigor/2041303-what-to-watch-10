import { CatalogFilm, FilterMainNavMenu, GenresFilter } from "../../const";
import { useAppSelector } from "../../hooks";
import { Film } from "../../types/film";
import SmallFilm from "../small-film";
import { CatalogFilmCards } from "./catalog-film-cards";
const FILM_CARD_COUNT = 4;

type CatalogFilmCardsInterfaceProps = {
  catalogFilter:string,
  sliceEnd?: number
  setFilmCount?:(count:number)=>void
}

export function CatalogFilmCardsInterface ({catalogFilter: CatalogFilter, sliceEnd, setFilmCount}:CatalogFilmCardsInterfaceProps):JSX.Element {
  const {filter, allFilms, similarFilms} = useAppSelector((state)=>state);
  let filmsFiltered = allFilms;
  let filmsFavoriteFiltered = allFilms;
  switch(CatalogFilter) {
    case CatalogFilm.GENRE_FILTER:
      if(filter !== GenresFilter[FilterMainNavMenu.ALL_GENRES] && setFilmCount !== undefined ){
        filmsFiltered = filmsFiltered.filter((film:Film)=>film.genre === filter);
        setFilmCount(filmsFiltered.length);
      }
      if(sliceEnd === undefined || setFilmCount === undefined){
        return <p>No film </p>;
      }
      setFilmCount(filmsFiltered.length);

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
