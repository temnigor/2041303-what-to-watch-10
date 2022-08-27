import ArtBoard from '../components/art-board/art-board';
import { CollectionFilmCardCatalog } from '../components/catalog-film-card/collection-catalog-film-card';
import Logo from '../components/logo/logo';
import { UserSign } from '../components/user-sign/user-sign';
import { CatalogFilm } from '../const';
import { useAppSelector } from '../hooks';
import { getFavoriteFilms, getIsErrorResponse } from '../store/data-api-process/selectors';

function MyList () {
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isErrorResponse = useAppSelector(getIsErrorResponse);

  return (
    <div>
      <ArtBoard/>
      <div className ="user-page">
        <header className ="page-header user-page__head">
          <Logo/>
          <h1 className ="page-title user-page__title">My list <span className ="user-page__film-count">{favoriteFilms.length}</span></h1>
          <ul className ="user-block">
            <UserSign />
          </ul>
        </header>
        <section className ="catalog">
          <h2 className ="catalog__title visually-hidden">Catalog</h2>

          {!isErrorResponse && favoriteFilms.length === 0
            ?
            <div className ="page-title">
              <h3>No Film in list</h3>
            </div>
            : null }

          {isErrorResponse
            ?
            <div className ="page-title">
              <h3>Loading Error please Reload</h3>
            </div>
            : null }
          <CollectionFilmCardCatalog catalogFilter={CatalogFilm.FavoriteFilter}/>
        </section>
        <footer className ="page-footer">
          <Logo footer/>
          <div className ="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default MyList;
