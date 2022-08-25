import { Film } from '../../types/film';
import Logo from '../logo/logo';
import { UserSign } from '../user-sign/user-sign';
import { Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import { MyListLink } from '../my-list-link/my-list-link';
import { memo } from 'react';

type BigFilmCardComponentsProps = {
  film:Film
}

function BigFilmCardComponents ({film}:BigFilmCardComponentsProps):JSX.Element {
  const{id, filmName, genre, yearCreation, bigPoster, poster} = film;

  return (
    <>
      <div className="film-card__bg">
        <img src={bigPoster} alt={filmName} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <Logo/>
        <UserSign/>
      </header>
      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={poster} alt={filmName} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{filmName}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{yearCreation}</span>
            </p>

            <div className="film-card__buttons">
              <Link to={AppRoute.Player.replace(':id', `${id}`)} className="btn btn--play film-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </Link>
              <MyListLink
                isPromoFilm
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const BigFilmCard = memo(BigFilmCardComponents, (prevProps, nextProps)=> prevProps.film.id === nextProps.film.id);
