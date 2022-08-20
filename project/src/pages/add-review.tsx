import { FormEvent, useState} from 'react';
import { Link, Navigate} from 'react-router-dom';
import { AddReviewDetails } from '../components/add-review-detail/add-review-detail';
import ArtBoard from '../components/art-board/art-board';
import Logo from '../components/logo/logo';
import { RatingStar } from '../components/rating-star/rating-star';
import { ReviewTextarea } from '../components/review-textarea/review-textarea';
import { UserSign } from '../components/user-sign/user-sign';
import { AppRoute } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postReviveAction } from '../store/api-action';
import { getIsErrorResponse, getOpenedFilms } from '../store/data-api-process/selectors';
import { getUserName } from '../store/user-process/selectors';


function AddReview ():JSX.Element {
  const openedFilm = useAppSelector(getOpenedFilms);
  const isErrorResponse = useAppSelector(getIsErrorResponse);
  const userName = useAppSelector(getUserName);
  const [comment, setComment] = useState('');
  const [isHideDetails, setIsHideDetails] = useState(true);
  const dispatch = useAppDispatch();
  if(openedFilm === undefined){
    return <Navigate to={AppRoute.Error}/>;
  }
  const {bigPoster, id, poster, filmName, rating} = openedFilm;
  const ratingForServer = Math.floor(rating);
  const date = new Date ();
  const dateReview = `${date.getDate()} ${date.toLocaleString('en', { month: 'long' })} ${date.getFullYear()}`;

  const updateStateHandler = (evt:FormEvent<HTMLTextAreaElement>):void => {
    evt.preventDefault();
    setComment(evt.currentTarget.value);
  };

  const postReviewHandler = (event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(comment.length === 0){
      setIsHideDetails(true);
      return;
    }
    setIsHideDetails(false);
    dispatch(postReviveAction({comment, rating:ratingForServer, id}));
  };
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
          <form action="#" onSubmit={postReviewHandler} className="add-review__form">
            {isErrorResponse && <div className="add-review__text"><p>Error Revive not post </p></div>}
            <RatingStar ratingFilm= {rating}/>
            <div className="add-review__text">
              <ReviewTextarea updateStateHandler={(evt)=>updateStateHandler(evt)} comment={comment}/>
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
                name={userName}
                comment={comment}
                rating={rating}
                date={dateReview}
              />
            </div>}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddReview;
