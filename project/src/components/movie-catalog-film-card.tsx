import { Film } from '../types/film';
import SmallFilm from './small-film';

type MovieCatalogFilmCardsProps = {
  films:Film[]
  sliceEnd: number
}
export function MovieCatalogFilmCards (props:MovieCatalogFilmCardsProps):JSX.Element {
  const sliceCount = props.sliceEnd < props.films.length ? props.sliceEnd : props.films.length;
  return (
    <div className ="catalog__films-list">
      {props.films.length === 0 ? <div className ="catalog__films-list"> No more film like this </div>
        : props.films.slice(0, sliceCount).map((filmCard)=> <SmallFilm key={filmCard.id} film = {filmCard}/>)}
    </div>
  );
}
