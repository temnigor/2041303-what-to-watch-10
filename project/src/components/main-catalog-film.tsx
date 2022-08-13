import { FilterMainNavMenu, GenresFilter } from '../const';
import { useAppSelector } from '../hooks';
import { Film } from '../types/film';
import SmallFilm from './small-film';

type MainCatalogFilmCardsProps = {
  sliceEnd: number
  setFilmCount:(count:number)=>void
}

function MainCatalogFilmCards ({sliceEnd, setFilmCount}:MainCatalogFilmCardsProps):JSX.Element {
  const {filter, allFilms} = useAppSelector((state)=>state);
  let filmsFiltered = allFilms;
  if(filter !== GenresFilter[FilterMainNavMenu.ALL_GENRES]){
    filmsFiltered = filmsFiltered.filter((film:Film)=>film.genre === filter);
    setFilmCount(filmsFiltered.length);
  }

  return filmsFiltered.length === 0 ? (<div className ="catalog__films-list"> No film Genre {filter}</div>
  ) : (
    <div className="catalog__films-list">
      {filmsFiltered.slice(0, sliceEnd).map((filmCard:Film)=><SmallFilm key={filmCard.id} film = {filmCard}/>)}
    </div>
  );
}
export {MainCatalogFilmCards};
