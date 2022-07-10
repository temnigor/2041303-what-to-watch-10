
function SmallFilm ():JSX.Element {
  return (
    <article className ="small-film-card catalog__films-card">
      <div className ="small-film-card__image">
        <img src="img/johnny-english.jpg" alt="Johnny English" width="280" height="175" />
      </div>
      <h3 className ="small-film-card__title">
        <a className ="small-film-card__link" href="film-page.html">Johnny English</a>
      </h3>
    </article>
  );
}

export default SmallFilm;
