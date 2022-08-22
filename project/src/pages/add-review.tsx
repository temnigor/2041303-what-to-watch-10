import { Link, Navigate} from 'react-router-dom';
import { AddReviewDetails } from '../components/add-review-detail/add-review-detail';
import { AddReviewForm } from '../components/add-review-form/add-review-form';
import ArtBoard from '../components/art-board/art-board';
import Logo from '../components/logo/logo';
import { UserSign } from '../components/user-sign/user-sign';
import { AppRoute } from '../const';
import { useAppSelector } from '../hooks';
import { getOpenedFilms } from '../store/data-api-process/selectors';

function AddReview ():JSX.Element {
  const openedFilm = useAppSelector(getOpenedFilms);

  if(openedFilm === undefined){
    return <Navigate to={AppRoute.Error}/>;
  }

  const {bigPoster, id, poster, filmName, rating} = openedFilm;

  return (
    <div>
      <ArtBoard/>
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src= {bigPoster} alt={filmName} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header">
            <Logo footer={false}/>
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={AppRoute.Film.replace(':id', `${id}`)} className="breadcrumbs__link">{filmName}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a href="#top" className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>
            <UserSign/>
          </header>
          <div className="film-card__poster film-card__poster--small">
            <img src={poster} alt={filmName} width="218" height="327" />
          </div>
        </div>
        <div className="add-review">
          <AddReviewForm id={id} rating={rating}/>
          <div>
            <AddReviewDetails/>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddReview;
