import { MainGenreFilter } from "../const"
import { Film } from "../types/film"
import SmallFilm from "./small-film"

type CatalogFilmCardsProps = {
  films:Film[]
  sliceEnd: number
}
export function CatalogFilmCards (props:CatalogFilmCardsProps):JSX.Element {
  return (
  <div className ="catalog__films-list">
    {props.films.slice(0, props.sliceEnd).map((filmCard)=> <SmallFilm key={filmCard.id} film = {filmCard}/>)}
</div>
  )
}
