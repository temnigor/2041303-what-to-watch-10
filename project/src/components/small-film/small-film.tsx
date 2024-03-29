import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Film } from '../../types/film';
import { PlayerSmallFilm } from '../player-small-film/player-small-film';

type SmallFilmProps = {
film:Film
}

function SmallFilm ({film}:SmallFilmProps):JSX.Element {
  const{id,filmName, previewImage, videoLink} = film;
  return (
    <article key={id} className ="small-film-card catalog__films-card">

      <PlayerSmallFilm previewImage= {previewImage} videoLink = {videoLink} id = {`${id}`}/>
      <h3 className ="small-film-card__title">

        <Link className ="small-film-card__link" to={AppRoute.Film.replace(':id', `${id}`)} >{filmName}</Link>

      </h3>

    </article>
  );
}

export default SmallFilm;
