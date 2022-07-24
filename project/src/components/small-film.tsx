import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { Film } from '../types/film';


type SmallFilmProps = {
film:Film
}

function SmallFilm (props:SmallFilmProps):JSX.Element {
  const{id,filmName, previewImage} = props.film;
  return (
    <article key={id} className ="small-film-card catalog__films-card">
      <div className ="small-film-card__image" onMouseMove = {(e)=>e.preventDefault()} >
        <img src= {previewImage} alt= {filmName} width="280" height="175" />
      </div>
      <h3 className ="small-film-card__title">

        <Link className ="small-film-card__link" to={AppRoute.Film.replace(':id', id)} >{filmName}</Link>

      </h3>

    </article>
  );
}

export default SmallFilm;
