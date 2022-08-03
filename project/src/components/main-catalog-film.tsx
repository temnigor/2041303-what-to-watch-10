import { GenresFilter } from '../const';
import { Film } from '../types/film';
import SmallFilm from './small-film';

type MainCatalogFilmCardsProps = {
  films:Film[]
  sliceEnd: number
  filterName:string
}
function MainCatalogFilmCards (props:MainCatalogFilmCardsProps):JSX.Element {
  return props.filterName === GenresFilter.ALL_GENRES ? (
    <div className ="catalog__films-list">
      {props.films.slice(0, props.sliceEnd).map((filmCard)=> <SmallFilm key={filmCard.id} film = {filmCard}/>)}
    </div>
  ) : (

    <CatalogFilmCardsFilter films = {props.films} sliceEnd = {props.sliceEnd} filterName={props.filterName}/>

  );

}

function CatalogFilmCardsFilter (props:MainCatalogFilmCardsProps):JSX.Element {
  const filmFilter = props.films.filter((film)=>film.genre === props.filterName);
  return filmFilter.length === 0 ? (<div className ="catalog__films-list"> No film Genre {props.filterName}</div>
  ) : (
    <div className ="catalog__films-list">
      {props.films.filter((film)=>film.genre === props.filterName).slice(0, props.sliceEnd).map((filmCard)=> <SmallFilm key={filmCard.id} film = {filmCard}/>)}
    </div>
  );
}
export {MainCatalogFilmCards};
