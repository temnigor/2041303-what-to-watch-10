import { Film } from '../types/film';
import SmallFilm from './small-film';

type MovieCatalogFilmCardsProps = {
  films:Film[]
  sliceEnd: number
}
export function MovieCatalogFilmCards ({films, sliceEnd}:MovieCatalogFilmCardsProps):JSX.Element {
  const sliceCount = sliceEnd < films.length ? sliceEnd : films.length;
  return (
    <div className ="catalog__films-list">
      {films.length === 0 ? <div className="catalog__films-list"> No more film like this </div>
        : films.slice(0, sliceCount).map((filmCard)=> <SmallFilm key={filmCard.id} film={filmCard}/>)}
    </div>
  );
}
