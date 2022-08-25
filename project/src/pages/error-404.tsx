import ArtBoard from '../components/art-board/art-board';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import Logo from '../components/logo/logo';


function Error404 ():JSX.Element {
  return (
    <div>
      <ArtBoard/>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Logo/>
        <header className="page-header film-card__head">
        </header>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <h1>404 Not Found</h1>
            <Link to={AppRoute.Main} className="logo__link" > <p className="film-card__info">Main Page</p></Link>
            <div className="film-card__desc">

            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <footer className="page-footer">
          <Logo footer/>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Error404;
