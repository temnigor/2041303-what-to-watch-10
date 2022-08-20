import { Link, Navigate, useParams } from 'react-router-dom';
import { useState, MouseEvent, useEffect } from 'react';
import ArtBoard from '../components/art-board/art-board';
import { AppRoute, AuthorizationStatus, CatalogFilm, NavMenuMoviePage } from '../const';
import { AllTabs } from '../components/all-tabs/all-tabs';
import Logo from '../components/logo/logo';
import { UserSign } from '../components/user-sign/user-sign';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getDataOpenFilmAction, getDataReviewsOpenFilm, getDataSimilarFilmsAction } from '../store/api-action';
import { LoadingScreen } from '../components/loading-screen/loading-screen';
import { CatalogFilmCardsInterface } from '../components/catalog-film-card/catalog-film-cards-interface';
import { getAllFilms, getIsErrorResponse, getOpenedFilms, getReviews } from '../store/data-api-process/selectors';
import { getAuthorizationStatus } from '../store/user-process/selectors';
import { AddFavoriteButton } from '../components/add-favorite-button/add-favorite-button';

const MoviePage = ():JSX.Element=>{
  const dispatch = useAppDispatch();
  const [navMenuButtonCount, setNavMenuButtonCount] = useState(NavMenuMoviePage.OVERVIEW);
  const openedFilm = useAppSelector(getOpenedFilms);
  const allFilms = useAppSelector(getAllFilms);
  const reviews = useAppSelector(getReviews);
  const isErrorResponse = useAppSelector(getIsErrorResponse);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const {id:idParam} = useParams();

  useEffect(() => {
    if(idParam){
      if(openedFilm === undefined || openedFilm.id !== +idParam){
        const idForServer = parseInt(idParam, 10);
        dispatch(getDataOpenFilmAction(idForServer));
        dispatch(getDataSimilarFilmsAction(idForServer));
        dispatch(getDataReviewsOpenFilm(idForServer));
      }}}, [dispatch, idParam, openedFilm]);

  if(idParam === undefined || isErrorResponse) {
    return < Navigate to={AppRoute.Error}/>;
  }
  if(openedFilm === undefined || openedFilm.id !== +idParam){
    return <LoadingScreen/>;
  }

  const {
    id,
    backgroundColor,
    bigPoster,
    filmName,
    genre,
    yearCreation,
    poster,
    isFavorite
  } = openedFilm;

  const myListFilmCount = allFilms.filter((filmCard)=>filmCard.isFavorite === true).length;

  return (
    <>
      <ArtBoard/>
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
                <Link to={AppRoute.MyList} className="btn btn--list film-card__button" type="button">
                  <AddFavoriteButton
                    isFavorite={isFavorite}
                    id={id}
                  />
                  <span>My list</span>
                  <span className="film-card__count">{myListFilmCount}</span>
                </Link>
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
                  <li className={`film-nav__item ${navMenuButtonCount === NavMenuMoviePage.OVERVIEW ? 'film-nav__item--active' : ''}`}
                    onClick={(event:MouseEvent<HTMLElement>) => {
                      event.preventDefault();
                      setNavMenuButtonCount(NavMenuMoviePage.OVERVIEW);
                    }}
                  >
                    <a href="#top" className="film-nav__link">Overview</a>
                  </li>
                  <li className={`film-nav__item ${navMenuButtonCount === NavMenuMoviePage.DETAILS ? 'film-nav__item--active' : ''}`}
                    onClick ={(event:MouseEvent<HTMLElement>) => {
                      event.preventDefault();
                      setNavMenuButtonCount(NavMenuMoviePage.DETAILS);
                    }}
                  >
                    <a href="#top" className="film-nav__link">Details</a>
                  </li>
                  <li className={`film-nav__item ${navMenuButtonCount === NavMenuMoviePage.REVIEWS ? 'film-nav__item--active' : ''}`}
                    onClick={(event:MouseEvent<HTMLElement>) => {
                      event.preventDefault();
                      setNavMenuButtonCount(NavMenuMoviePage.REVIEWS);
                    }}
                  >
                    <a href="#top" className="film-nav__link" >Reviews</a>
                  </li>
                </ul>
              </nav>
              <AllTabs
                filmForPage={openedFilm}
                nameButton={navMenuButtonCount}
                reviews={reviews}
              />
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <CatalogFilmCardsInterface
            catalogFilter={CatalogFilm.SIMILAR_FILTER}
          />
        </section>
        <footer className="page-footer">
          <Logo footer/>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MoviePage;
