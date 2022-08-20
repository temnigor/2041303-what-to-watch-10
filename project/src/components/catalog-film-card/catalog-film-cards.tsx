import { Film } from '../../types/film';
import SmallFilm from '../small-film/small-film';


type CatalogFilmCardsProps = {
  films:Film[]
  sliceEnd: number
}
export function CatalogFilmCards ({films, sliceEnd}:CatalogFilmCardsProps):JSX.Element {
  return (
    <div className ="catalog__films-list">
      {films.slice(0, sliceEnd).map((filmCard)=> <SmallFilm key={filmCard.id} film = {filmCard}/>)}
    </div>
  );
}
