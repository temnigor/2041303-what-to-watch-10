import ArtBoard from '../components/art-board';
import Logo from '../components/logo/logo';
import { MainGenreMenu } from '../components/main-genre-menu';
import { useState } from 'react';
import { MainCatalogFilmCards } from '../components/main-catalog-film';
import { BigFilmCard } from '../components/big-film-card';
import { MainShowMoreButton } from '../components/main-show-more-button';
const FILM_CARD_COUNT = 8;


function Main ():JSX.Element {
  const [sliceEnd, setSliceEnd] = useState (FILM_CARD_COUNT);
  return (
    <div>
      <ArtBoard/>
      <BigFilmCard />
      <div className ="page-content">
        <section className ="catalog">
          <h2 className ="catalog__title visually-hidden">Catalog</h2>
          <MainGenreMenu/>
          <MainCatalogFilmCards sliceEnd = {sliceEnd}/>
          <MainShowMoreButton sliceEnd = {sliceEnd} setSlice = {(slice:number)=>setSliceEnd(slice)}/>
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
