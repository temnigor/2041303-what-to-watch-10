import { FormEvent, useState} from 'react';
import { Link, Navigate} from 'react-router-dom';
import { AddReviewDetails } from '../components/add-review-detail';
import ArtBoard from '../components/art-board';
import Logo from '../components/logo/logo';
import { RatingStar } from '../components/rating-star';
import { UserSign } from '../components/user-sign';
import { AppRoute } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postReviveAction } from '../store/api-action';


function AddReview ():JSX.Element {
  const {openedFilm, isErrorResponse} = useAppSelector((state)=>state);
  const [comment, setComment] = useState('');
  const [isHideDetails, setIsHideDetails] = useState(true);
  const {userName} = useAppSelector((state)=>state);
  const dispatch = useAppDispatch();
  if(openedFilm === undefined){
    return <Navigate to={AppRoute.Error}/>;
  }
  const {bigPoster, id, poster, filmName, rating} = openedFilm;
  const date = new Date ();
  const dateReview = `${date.getDate()} ${date.toLocaleString('en', { month: 'long' })} ${date.getFullYear()}`;
  const updateStateHandler = (evt:FormEvent<HTMLTextAreaElement>):void => {
    evt.preventDefault();
    setComment(evt.currentTarget.value);
  };
  return openedFilm !== undefined ? (
    <div>
      <ArtBoard/>
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src= {bigPoster} alt= {filmName} />
          </div>

          <h1 className ="visually-hidden">WTW</h1>

          <header className="page-header">
            <Logo footer = {false}/>
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to= {AppRoute.Film.replace(':id', id)} className="breadcrumbs__link">{filmName}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a href="#top" className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <UserSign/>
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src= {poster} alt= {filmName} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" onSubmit={(event:FormEvent<HTMLFormElement>)=>{
            event.preventDefault();
            setIsHideDetails( comment.length === 0);
            dispatch(postReviveAction({comment, rating, id}));
          } } className="add-review__form"
          >
            {isErrorResponse && <div className="add-review__text"><p>Error Revive not post </p></div>}
            <RatingStar ratingFilm = {rating}/>

            <div className="add-review__text">
              <textarea onChange={updateStateHandler} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value = {comment} ></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" >
                    Post
                </button>
              </div>
            </div>
          </form>
          <div>
            {!isHideDetails &&
            <div className="add-review__text">
              <AddReviewDetails
                name= {userName}
                comment = {comment}
                rating = {rating}
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
