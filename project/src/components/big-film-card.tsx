import { Film } from '../types/film';
import { useAppSelector } from '../hooks';
import Logo from './logo/logo';
import { UserSign } from './user-sign';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';

function BigFilmCard ():JSX.Element {
  const {allFilms} = useAppSelector((state)=>state);
  const filmForPoster : Film | undefined = allFilms[0];
  const{id,filmName,genre,yearCreation,bigPoster, poster} = filmForPoster;
  return (
    <section className ="film-card">
      <div className ="film-card__bg">
        <img src= {bigPoster} alt= {filmName} />
      </div>

      <h1 className ="visually-hidden">WTW</h1>

      <header className ="page-header film-card__head">
        <Logo/>
        <UserSign />
      </header>
      <div className ="film-card__wrap">
        <div className ="film-card__info">
          <div className ="film-card__poster">
            <img src= {poster} alt= {filmName} width="218" height="327" />
          </div>

          <div className ="film-card__desc">
            <h2 className ="film-card__title">{filmName}</h2>
            <p className ="film-card__meta">
              <span className ="film-card__genre">{genre}</span>
              <span className ="film-card__year">{yearCreation}</span>
            </p>

            <div className ="film-card__buttons">
              <Link to = {AppRoute.Player.replace(':id', id)} className ="btn btn--play film-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </Link>
              <Link to = {AppRoute.MyList} className ="btn btn--list film-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
                <span className ="film-card__count">{allFilms.filter((films)=>films.isFavorite === true).length}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export{BigFilmCard};
