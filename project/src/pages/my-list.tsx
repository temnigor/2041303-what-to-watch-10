import ArtBoard from '../components/art-board';
import { CatalogFilmCards } from '../components/catalog-film-cards';
import Logo from '../components/logo/logo';
import { UserSign } from '../components/user-sign';
import { useAppSelector } from '../hooks';

const FILM_CARD_COUNT = 9;

function MyList () {
  const {allFilms} = useAppSelector((state)=>state);
  return (
    <div>
      <ArtBoard/>
      <div className ="user-page">
        <header className ="page-header user-page__head">
          <Logo/>
          <h1 className ="page-title user-page__title">My list <span className ="user-page__film-count">9</span></h1>
          <ul className ="user-block">
            <UserSign />
          </ul>
        </header>
        <section className ="catalog">
          <h2 className ="catalog__title visually-hidden">Catalog</h2>
          <CatalogFilmCards films = {allFilms} sliceEnd = {FILM_CARD_COUNT}/>
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
