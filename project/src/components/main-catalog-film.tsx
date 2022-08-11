import {useAppSelector } from '../hooks';

import { Film } from '../types/film';
import SmallFilm from './small-film';

type MainCatalogFilmCardsProps = {
  sliceEnd: number
}
function MainCatalogFilmCards (props:MainCatalogFilmCardsProps):JSX.Element {
  const genre = useAppSelector((state)=>state.filter);
  const filmsFiltered:Film[] = useAppSelector((state)=>state.filmsFiltered);


  return filmsFiltered.length === 0 ? (<div className ="catalog__films-list"> No film Genre {genre}</div>
  ) : (
    <div className ="catalog__films-list">
      {filmsFiltered.slice(0, props.sliceEnd).map((filmCard:Film)=> <SmallFilm key={filmCard.id} film = {filmCard}/>)}
    </div>
  );
}
export {MainCatalogFilmCards};
