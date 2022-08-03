import { Film } from '../types/film';
import SmallFilm from './small-film';

type MovieCatalogFilmCardsProps = {
  films:Film[]
  sliceEnd: number
  filter:string
}
export function MovieCatalogFilmCards (props:MovieCatalogFilmCardsProps):JSX.Element {
  const filteredFilm = props.films.filter((film) => film.genre === props.filter);
  const sliceCount = props.sliceEnd < filteredFilm.length ? props.sliceEnd : filteredFilm.length;
  return (
    <div className ="catalog__films-list">
      {filteredFilm.length === 0 ? <div className ="catalog__films-list"> No more film like this </div>
        : filteredFilm.slice(0, sliceCount).map((filmCard)=> <SmallFilm key={filmCard.id} film = {filmCard}/>)}
    </div>
  );
}
