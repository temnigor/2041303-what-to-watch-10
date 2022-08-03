import { Link, Navigate, useParams } from 'react-router-dom';
import { useState, MouseEvent } from 'react';
import ArtBoard from '../components/art-board';
import { AppRoute, NavMenuMoviePage } from '../const';
import { FilmAbout } from '../components/movie-tabs/film-about';
import Logo from '../components/logo/logo';
import { Film } from '../types/film';
import { UserSing } from '../components/user-sing';
import { Review } from '../types/review';
import { MovieCatalogFilmCards } from '../components/movie-catalog-film-card';

type MoviePageProps = {
  films : Film[]
  authorizationStatus:string,
  reviews:Review[]
};
const FILM_CARD_COUNT = 4;
const MoviePage = (props:MoviePageProps):JSX.Element=>{
  const param = useParams();
  const filmForPage = props.films.find((film) => film.id === param.id);
  const myListFilmCount = props.films.filter((filmCard)=>filmCard.isFavorite === true).length;
  const [navMenuButtonCount, setNavMenuButtonCount] = useState(NavMenuMoviePage.OVERVIEW);

  return filmForPage ? (
    <>
      <ArtBoard/>
      <section className ="film-card film-card--full">
        <div className ="film-card__hero">
          <div className ="film-card__bg">
            <img src={filmForPage.bigPoster} alt= {filmForPage.filmName} />
          </div>

          <h1 className ="visually-hidden">WTW</h1>

          <header className ="page-header film-card__head">
            <Logo />
            <UserSing status = {props.authorizationStatus} />
          </header>
          <div className ="film-card__wrap">
            <div className ="film-card__desc">
              <h2 className ="film-card__title">{filmForPage.filmName}</h2>
              <p className ="film-card__meta">
                <span className ="film-card__genre">{filmForPage.genre}</span>
                <span className ="film-card__year">{filmForPage.yearCreation}</span>
              </p>

              <div className ="film-card__buttons">

                <Link to = {AppRoute.Player.replace(':id', filmForPage.id)} className ="btn btn--play film-card__button" type="button">
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
                  <span className ="film-card__count">{myListFilmCount}</span>
                </Link>

                <Link to = {AppRoute.AddReview.replace(':id', filmForPage.id)} className ="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className ="film-card__wrap film-card__translate-top">
          <div className ="film-card__info">
            <div className ="film-card__poster film-card__poster--big">
              <img src={filmForPage.poster} alt= {filmForPage.filmName} width="218" height="327" />
            </div>

            <div className ="film-card__desc">
              <nav className ="film-nav film-card__nav">
                <ul className ="film-nav__list">
                  <li className = {`film-nav__item ${navMenuButtonCount === NavMenuMoviePage.OVERVIEW ? 'film-nav__item--active' : ''}`}
                    onClick ={(event:MouseEvent<HTMLElement>)=> {
                      event.preventDefault();
                      setNavMenuButtonCount(NavMenuMoviePage.OVERVIEW);
                    }}
                  >
                    <a href="#top" className ="film-nav__link">Overview</a>
                  </li>
                  <li className ={`film-nav__item ${navMenuButtonCount === NavMenuMoviePage.DETAILS ? 'film-nav__item--active' : ''}`}
                    onClick ={(event:MouseEvent<HTMLElement>)=> {
                      event.preventDefault();
                      setNavMenuButtonCount(NavMenuMoviePage.DETAILS);
                    }}
                  >
                    <a href="#top" className ="film-nav__link">Details</a>
                  </li>
                  <li className ={`film-nav__item ${navMenuButtonCount === NavMenuMoviePage.REVIEWS ? 'film-nav__item--active' : ''}`}
                    onClick ={(event:MouseEvent<HTMLElement>)=> {
                      event.preventDefault();
                      setNavMenuButtonCount(NavMenuMoviePage.REVIEWS);
                    }}
                  >
                    <a href="#top" className ="film-nav__link" >Reviews</a>
                  </li>
                </ul>
              </nav>
              <FilmAbout
                filmForPage = {filmForPage}
                nameButton = {navMenuButtonCount}
                reviews = {props.reviews}
              />
            </div>
          </div>
        </div>
      </section>

      <div className ="page-content">
        <section className ="catalog catalog--like-this">
          <h2 className ="catalog__title">More like this</h2>
          <MovieCatalogFilmCards films = {props.films} sliceEnd = {FILM_CARD_COUNT} filter = {filmForPage.genre}/>
        </section>
        <footer className ="page-footer">
          <Logo footer/>
          <div className ="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  ) : (
    <Navigate to = {AppRoute.Error}/>
  );
};

export default MoviePage;
