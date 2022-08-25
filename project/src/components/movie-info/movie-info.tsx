import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getReviews } from '../../store/data-api-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Film } from '../../types/film';
import { AllTabs } from '../all-tabs/all-tabs';
import Logo from '../logo/logo';
import { MovieNavMenu } from '../movie-nav-menu/movie-nav-menu';
import { MyListLink } from '../my-list-link/my-list-link';
import { UserSign } from '../user-sign/user-sign';

type MovieInfoComponentsProps = {
  openedFilm:Film
}

function MovieInfoComponents (props:MovieInfoComponentsProps ){
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const reviews = useAppSelector(getReviews);
  const {
    id,
    backgroundColor,
    bigPoster,
    filmName,
    genre,
    yearCreation,
    poster,
  } = props.openedFilm;
  return(
    <section className="film-card film-card--full" style={{background:backgroundColor}}>
      <div className="film-card__hero">
        <div className="film-card__bg">
          <img src={bigPoster} alt= {filmName} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <Logo />
          <UserSign/>
        </header>
        <div className="film-card__wrap">
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
                isPromoFilm={false}
              />
              {
                authorizationStatus === AuthorizationStatus.Auth
                  ? <Link to={AppRoute.AddReview.replace(':id', `${id}`)} className="btn film-card__button">Add review</Link>
                  : null
              }
            </div>
          </div>
        </div>
      </div>
      <div className="film-card__wrap film-card__translate-top">
        <div className="film-card__info">
          <div className="film-card__poster film-card__poster--big">
            <img src={poster} alt={filmName} width="218" height="327" />
          </div>
          <div className="film-card__desc">
            <nav className="film-nav film-card__nav">
              <ul className="film-nav__list">
                <MovieNavMenu/>
              </ul>
            </nav>
            <AllTabs
              filmForPage={props.openedFilm}
              reviews={reviews}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export const MovieInfo = memo(MovieInfoComponents, (prevProps, nextProps)=>prevProps.openedFilm.id === nextProps.openedFilm.id);
