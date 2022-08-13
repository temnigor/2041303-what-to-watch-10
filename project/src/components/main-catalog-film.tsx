import {useAppSelector } from '../hooks';


import { Film } from '../types/film';
import SmallFilm from './small-film';

type MainCatalogFilmCardsProps = {
  sliceEnd: number
}
function MainCatalogFilmCards (props:MainCatalogFilmCardsProps):JSX.Element {

  const {filter, filmsFiltered} = useAppSelector((state)=>state);

  return filmsFiltered.length === 0 ? (<div className ="catalog__films-list"> No film Genre {filter}</div>
  ) : (
    <div className ="catalog__films-list">
      {filmsFiltered.slice(0, props.sliceEnd).map((filmCard:Film)=> <SmallFilm key={filmCard.id} film = {filmCard}/>)}
    </div>
  );
}
export {MainCatalogFilmCards};
