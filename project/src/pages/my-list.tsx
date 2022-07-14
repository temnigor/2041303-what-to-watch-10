import ArtBoard from '../components/art-board';
import Logo from '../components/logo/logo';
import SmallFilm from '../components/small-film';

function MyList () {
  return (
    <div>
      <ArtBoard/>

      <div className ="user-page">
        <header className ="page-header user-page__head">
          <Logo/>

          <h1 className ="page-title user-page__title">My list <span className ="user-page__film-count">9</span></h1>
          <ul className ="user-block">
            <li className ="user-block__item">
              <div className ="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className ="user-block__item">
              <a href = "#top" className ="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <section className ="catalog">
          <h2 className ="catalog__title visually-hidden">Catalog</h2>

          <div className ="catalog__films-list">
            < SmallFilm />
            < SmallFilm />
            < SmallFilm />
            < SmallFilm />
            < SmallFilm />
            < SmallFilm />
            < SmallFilm />
            < SmallFilm />
            < SmallFilm />
          </div>
        </section>

        <footer className ="page-footer">
          <div className ="logo">
            <a href="main.html" className ="logo__link logo__link--light">
              <span className ="logo__letter logo__letter--1">W</span>
              <span className ="logo__letter logo__letter--2">T</span>
              <span className ="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className ="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default MyList;