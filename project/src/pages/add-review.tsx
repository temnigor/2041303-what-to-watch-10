import { FormEvent, useState} from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AddReviewDetails } from '../components/add-review-detail';
import ArtBoard from '../components/art-board';
import Logo from '../components/logo/logo';
import { RatingStar } from '../components/rating-star';
import { UserSign } from '../components/user-sign';
import { AppRoute } from '../const';
import { useAppSelector } from '../hooks';


function AddReview ():JSX.Element {
  const param = useParams();
  const {allFilms} = useAppSelector((state)=>state);
  const {userName} = useAppSelector((state)=>state);
  const filmReview = allFilms.find((film)=> film.id === param.id);
  const date = new Date ();
  const dateReview = `${date.getDate()} ${date.toLocaleString('en', { month: 'long' })} ${date.getFullYear()}`;
  const [comment, setComment] = useState('');
  const [isHideDetails, setIsHideDetails] = useState(true);
  const updateStateHandler = (evt:FormEvent<HTMLTextAreaElement>):void => {
    evt.preventDefault();
    setComment(evt.currentTarget.value);
  };
  return filmReview ? (
    <div>
      <ArtBoard/>
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src= {filmReview.bigPoster} alt= {filmReview.filmName} />
          </div>

          <h1 className ="visually-hidden">WTW</h1>

          <header className="page-header">
            <Logo footer = {false}/>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to= {AppRoute.Film.replace(':id', filmReview.id)} className="breadcrumbs__link">{filmReview.filmName}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a href="#top" className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <UserSign/>
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src= {filmReview.poster} alt= {filmReview.filmName} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" onSubmit={(event:FormEvent<HTMLFormElement>)=>{
            event.preventDefault();
            setIsHideDetails( comment.length === 0);
          } } className="add-review__form"
          >
            <RatingStar ratingFilm = {filmReview.rating}/>

            <div className="add-review__text">
              <textarea onChange={updateStateHandler} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value = {comment} ></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" >Post</button>
              </div>
            </div>
          </form>
          <div>
            {!isHideDetails &&
            <div className="add-review__text">
              <AddReviewDetails
                name= {userName}
                comment = {comment}
                rating = {filmReview.rating}
                date = {dateReview}
              />
            </div>}
          </div>
        </div>
      </section>
    </div>
  ) : (
    <Navigate to = {AppRoute.Error}/>
  );
}

export default AddReview;
