import ArtBoard from '../components/art-board';
import Logo from '../components/logo/logo';
import { Film } from '../types/film';
import { Link } from 'react-router-dom';
import { UserSing } from '../components/user-sing';
import { AppRoute} from '../const';
import { MainGenreMenu } from '../components/main-genre-menu';
import { MouseEvent, useState } from 'react';
import { MainCatalogFilmCards } from '../components/main-catalog-film';
import { useAppSelector } from '../hooks';
const FILM_CARD_COUNT = 8;
const SLICE_STEP = 8;
type MainProps = {
  films:Film[]
  authorizationStatus:string
}

function Main (props:MainProps):JSX.Element {
  const{id,filmName,genre,yearCreation,bigPoster, poster} = props.films[0];
  const [sliceEnd, setSliceEnd] = useState (FILM_CARD_COUNT);
  const filmsFilteredLength = useAppSelector((state)=>state.filmsFiltered.length);
  return (
    <div>
      <ArtBoard/>

      <section className ="film-card">
        <div className ="film-card__bg">
          <img src= {bigPoster} alt= {filmName} />
        </div>

        <h1 className ="visually-hidden">WTW</h1>

        <header className ="page-header film-card__head">
          <Logo/>
          <UserSing status = {props.authorizationStatus} />
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
                  <span className ="film-card__count">{props.films.filter((films)=>films.isFavorite === true).length}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className ="page-content">
        <section className ="catalog">
          <h2 className ="catalog__title visually-hidden">Catalog</h2>
          <MainGenreMenu />
          <MainCatalogFilmCards sliceEnd = {sliceEnd}/>
          <div className ="catalog__more">
            {sliceEnd === filmsFilteredLength || filmsFilteredLength === 0
              ? null
              :
              <button className ="catalog__button" type="button" onClick={(evt:MouseEvent<HTMLButtonElement>)=>{
                const slice = sliceEnd + SLICE_STEP;
                filmsFilteredLength < slice
                  ? setSliceEnd(filmsFilteredLength)
                  : setSliceEnd(slice);
              }}
              >
            Show more
              </button>}

          </div>
        </section>
        <footer className ="page-footer">
          <Logo footer />
          <div className ="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Main;
