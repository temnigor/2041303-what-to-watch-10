import { Link, Navigate, useParams } from 'react-router-dom';
import { useState, MouseEvent } from 'react';
import ArtBoard from '../components/art-board';
import { AppRoute, NavMenuMoviePage } from '../const';
import { FilmAbout } from '../components/movie-tabs/film-about';
import Logo from '../components/logo/logo';
import { UserSign } from '../components/user-sign';
import { MovieCatalogFilmCards } from '../components/movie-catalog-film-card';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getDataMoviePageAction } from '../store/api-action';
import { LoadingScreen } from '../components/loading-screen/loading-screen';

const FILM_CARD_COUNT = 4;
const MoviePage = ():JSX.Element=>{
  const [navMenuButtonCount, setNavMenuButtonCount] = useState(NavMenuMoviePage.OVERVIEW);
  const {oneFilm, similarFilms, allFilms} = useAppSelector((state)=>state);
  const {id} = useParams();
  const dispatch = useAppDispatch();
  if(id !== undefined){
    dispatch(getDataMoviePageAction({id}));
  }
  if(oneFilm === null ) {
    return <LoadingScreen/>;
  }
  const film = oneFilm;
  const backgroundColor = {
    background:film.backgroundColor
  };
  const myListFilmCount = allFilms.filter((filmCard)=>filmCard.isFavorite === true).length;


  return (
    <>
      <ArtBoard/>
      <section className ="film-card film-card--full" style={backgroundColor}>
        <div className ="film-card__hero">
          <div className ="film-card__bg">
            <img src={film.bigPoster} alt= {film.filmName} />
          </div>

          <h1 className ="visually-hidden">WTW</h1>

          <header className ="page-header film-card__head">
            <Logo />
            <UserSign />
          </header>
          <div className ="film-card__wrap">
            <div className ="film-card__desc">
              <h2 className ="film-card__title">{film.filmName}</h2>
              <p className ="film-card__meta">
                <span className ="film-card__genre">{film.genre}</span>
                <span className ="film-card__year">{film.yearCreation}</span>
              </p>

              <div className ="film-card__buttons">

                <Link to = {AppRoute.Player.replace(':id', film.id)} className ="btn btn--play film-card__button" type="button">
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

                <Link to = {AppRoute.AddReview.replace(':id', film.id)} className ="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className ="film-card__wrap film-card__translate-top">
          <div className ="film-card__info">
            <div className ="film-card__poster film-card__poster--big">
              <img src={film.poster} alt= {film.filmName} width="218" height="327" />
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
                filmForPage = {film}
                nameButton = {navMenuButtonCount}
              />
            </div>
          </div>
        </div>
      </section>

      <div className ="page-content">
        <section className ="catalog catalog--like-this">
          <h2 className ="catalog__title">More like this</h2>
          <MovieCatalogFilmCards films = {similarFilms} sliceEnd = {FILM_CARD_COUNT}/>
        </section>
        <footer className ="page-footer">
          <Logo footer/>
          <div className ="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  )
};

export default MoviePage;
