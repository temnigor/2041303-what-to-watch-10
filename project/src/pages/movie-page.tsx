import { Link, useParams } from 'react-router-dom';
import { useState, MouseEvent } from 'react';
import ArtBoard from '../components/art-board';
import { AppRoute, NavMenuMoviePage } from '../const';
import { CatalogFilmCards } from '../components/catalog-film-cards';
import { FilmAbout } from '../components/film-about';
import Logo from '../components/logo/logo';
import { getReviews } from '../mocks/reviews';
import { Film } from '../types/film';
import Error404 from './error-404';
import { UserSing } from '../components/user-sing';

type MoviePageProps = {
  films : Film[]
  authorizationStatus:string
};
const FILM_CARD_COUNT = 4;
const MoviePage = (props:MoviePageProps):JSX.Element=>{
  const idFilm = useParams();
  const filmForPage = props.films.find((film) => film.id === idFilm.id);
  const myListFilmCount = props.films.filter((filmCard)=>filmCard.isFavorite === true).length;
  const resultMenuButton = useState(`${NavMenuMoviePage.OVERVIEW}`);
  const navMenuButtonCount = resultMenuButton[0];
  const setNavMenuButtonCount = resultMenuButton[1];

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

                <Link to = {`/player/${filmForPage.id}`} className ="btn btn--play film-card__button" type="button">
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

                <Link to = 'review' className ="btn film-card__button">Add review</Link>
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
                  <li className ="film-nav__item film-nav__item--active" onClick ={(event:MouseEvent<HTMLElement>)=> {
                   event.preventDefault();
                  document.querySelector('.film-nav__item--active')?.classList.remove('film-nav__item--active');
                  event.currentTarget.classList.add('film-nav__item--active');
                  setNavMenuButtonCount(NavMenuMoviePage.OVERVIEW);
                }}>
                    <a href="#top" className ="film-nav__link">Overview</a>
                  </li>
                  <li className ="film-nav__item" onClick ={(event:MouseEvent<HTMLElement>)=> {
                   event.preventDefault();
                  document.querySelector('.film-nav__item--active')?.classList.remove('film-nav__item--active');
                  event.currentTarget.classList.add('film-nav__item--active');
                  setNavMenuButtonCount(NavMenuMoviePage.DETAILS);
                }}>
                    <a href="#top" className ="film-nav__link">Details</a>
                  </li>
                  <li className ="film-nav__item" onClick ={(event:MouseEvent<HTMLElement>)=> {
                   event.preventDefault();
                  document.querySelector('.film-nav__item--active')?.classList.remove('film-nav__item--active');
                  event.currentTarget.classList.add('film-nav__item--active');
                  setNavMenuButtonCount(NavMenuMoviePage.REVIEWS);
                }}>
                    <a href="#top" className ="film-nav__link" >Reviews</a>
                  </li>
                </ul>
              </nav>
               <FilmAbout
               filmForPage = {filmForPage}
               nameButton = {navMenuButtonCount}
               reviews = {getReviews()}
               />
            </div>
          </div>
        </div>
      </section>

      <div className ="page-content">
        <section className ="catalog catalog--like-this">
          <h2 className ="catalog__title">More like this</h2>
            <CatalogFilmCards films = {props.films} sliceEnd = {FILM_CARD_COUNT}/>
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
    <Error404/>
  )
}

export default MoviePage;
